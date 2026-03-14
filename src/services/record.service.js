import { and, eq, sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { records } from "../db/schema/records.schema.js";
import {
    RECORD_BASE_POINTS,
} from "../constants/record.constants.js";

export const upsertRecordInDb = async (recordData) => {
    try {
        await db.transaction(async (tx) => {
            const existingRecord = await checkExistingRecord(tx, recordData);

            const playerRecord = existingRecord[0];
            if (playerRecord && recordData.time >= playerRecord.time) { // slow record scenario
                return ;
            }

            const newRank = await getNewRank(tx, recordData);

            const recordsOnMap = await getRecordsOnMap(tx, recordData);
            const totalRecords = recordsOnMap + (playerRecord ? 0 : 1); // new record = total + 1

            let pointsCalcStart = null;
            let pointsCalcEnd = null;

            if (!playerRecord) { // new record scenario
                await incrementSlowerTimes(tx, recordData, newRank);
                await insertRecord(tx, recordData, newRank);

                pointsCalcStart = 1; // since all records have to be updated
                pointsCalcEnd = totalRecords;
            } else { // fast record scenario
                const playerRecordId = playerRecord.id; // existing record id
                const oldRank = playerRecord.place;

                if (newRank < oldRank) { // improve rank scenario
                    await incrementSlowerTimes(tx, recordData, newRank, oldRank);

                    pointsCalcStart = newRank;
                    pointsCalcEnd = oldRank;
                }

                await updateRecord(tx, recordData, newRank, playerRecordId);
            }

            // pro records require point re-calculations
            if (recordData.mode === "pro" && pointsCalcStart && pointsCalcEnd) {
                await recalculatePoints(
                    tx, recordData, totalRecords, pointsCalcStart, pointsCalcEnd);
            }

            return; // transaction done
        });
    } catch (error) {
        console.error("Error in upsertRecordInDb: ", error);
        throw error;
    }
};

export const checkExistingRecord = async (tx, recordData) => {
    const existingRecord = await tx
        .select({
            id: records.id,
            time: records.time,
            place: records.place,
        })
        .from(records)
        .where(
            and(
                eq(records.player_id, recordData.player_id),
                eq(records.map_id, recordData.map_id),
                eq(records.mode, recordData.mode),
            ),
        )
        .limit(1);

    return existingRecord;
};

export const getNewRank = async (tx, recordData) => {
    const rank = await tx.execute(sql`
        SELECT COUNT(*) + 1 AS rank
        FROM records
        WHERE map_id = ${recordData.map_id}
        AND mode = ${recordData.mode}
        AND time < ${recordData.time}
    `);

    return Number(rank.rows[0].rank);
};

export const getRecordsOnMap = async (tx, recordData) => {
    const recordsOnMap = await tx.execute(sql`
        SELECT COUNT(*) AS total
        FROM records
        WHERE map_id = ${recordData.map_id}
        AND mode = ${recordData.mode}
    `);

    return Number(recordsOnMap.rows[0].total);
};

export const incrementSlowerTimes = async (tx, recordData, newRank, oldRank = null) => {
    await tx.execute(sql`
        UPDATE records
        SET place = place + 1
        WHERE map_id = ${recordData.map_id}
        AND mode = ${recordData.mode}
        AND place >= ${newRank}
        ${oldRank ? sql`AND place < ${oldRank}` : sql``}
    `);
};

export const insertRecord = async (tx, recordData, newRank) => {
    await tx.insert(records).values({
        ...recordData,
        place: newRank,
        points: 0,
    });
};

export const updateRecord = async (tx, recordData, newRank, playerRecordId) => {
    await tx
        .update(records)
        .set({
            time: recordData.time,
            place: newRank,
        })
        .where(
            eq(records.id, playerRecordId),
        );
};

export const recalculatePoints = async (
    tx, recordData, totalRecords, pointsCalcStart, pointsCalcEnd) => {
    await tx.execute(sql`
        UPDATE records r
        SET points = FLOOR(
            ${RECORD_BASE_POINTS}
            * d.multiplier
            * SQRT(${totalRecords})
            * (1 / SQRT(r.place))
        )
        FROM maps m
        JOIN difficulty d ON m.difficulty_id = d.id
        WHERE r.map_id = m.id
        AND r.map_id = ${recordData.map_id}
        AND r.mode = 'pro'
        AND r.place BETWEEN ${pointsCalcStart} AND ${pointsCalcEnd}
    `);
};
