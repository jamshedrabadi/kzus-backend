import { and, eq, gte, lt, lte, sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { records } from "../db/schema/records.schema.js";
import { maps } from "../db/schema/maps.schema.js";
import { difficulty } from "../db/schema/difficulty.schema.js";
import {
    RECORD_BASE_POINTS,
    RECORD_MODE_LOCK_VALUES,
} from "../constants/record.constants.js";

export const upsertRecordInDb = async (recordData) => {
    try {
        return await db.transaction(async (tx) => {
            // locking mechanism for race condition (auto release on txn commit)
            const txnLockKey = (recordData.map_id * 10) + RECORD_MODE_LOCK_VALUES[recordData.mode];
            await tx.execute(sql`SELECT pg_advisory_xact_lock(${txnLockKey})`);

            const existingRecord = await checkExistingRecord(tx, recordData);

            const playerRecord = existingRecord[0];
            if (playerRecord && recordData.time >= playerRecord.time) { // slow record scenario
                return { success: false };
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

            return { success: true }; // transaction done
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
    const rankResult = await tx
        .select({
            rank: sql`count(*) + 1`,
        })
        .from(records)
        .where(
            and(
                eq(records.map_id, recordData.map_id),
                eq(records.mode, recordData.mode),
                lte(records.time, recordData.time),
            ),
        );

    return Number(rankResult[0].rank);
};

export const getRecordsOnMap = async (tx, recordData) => {
    const recordsResult = await tx
        .select({
            total: sql`count(*)`,
        })
        .from(records)
        .where(
            and(
                eq(records.map_id, recordData.map_id),
                eq(records.mode, recordData.mode),
            ),
        );

    return Number(recordsResult[0].total);
};

export const incrementSlowerTimes = async (tx, recordData, newRank, oldRank = null) => {
    const conditions = [
        eq(records.map_id, recordData.map_id),
        eq(records.mode, recordData.mode),
        gte(records.place, newRank),
    ];
    if (oldRank) {
        conditions.push(lt(records.place, oldRank));
    }

    return await tx
        .update(records)
        .set({
            place: sql`${records.place} + 1`,
        })
        .where(
            and(...conditions),
        );
};

export const insertRecord = async (tx, recordData, newRank) => {
    return await tx
        .insert(records)
        .values({
            ...recordData,
            place: newRank,
            points: 0,
        });
};

export const updateRecord = async (tx, recordData, newRank, playerRecordId) => {
    return await tx
        .update(records)
        .set({
            time: recordData.time,
            place: newRank,
            improvements: sql`${records.improvements} + 1`,
            updated_at: new Date(),
        })
        .where(
            eq(records.id, playerRecordId),
        );
};

export const recalculatePoints = async (
    tx, recordData, totalRecords, pointsCalcStart, pointsCalcEnd) => {

    return await tx
        .update(records)
        .set({
            points: sql`
                FLOOR(
                    ${RECORD_BASE_POINTS}
                    * ${difficulty.multiplier}
                    * SQRT(${totalRecords})
                    * (1 / SQRT(${records.place}))
                )`,
        })
        .from(maps)
        .innerJoin(difficulty,
            eq(maps.difficulty_id, difficulty.id),
        )
        .where(
            and(
                eq(records.map_id, maps.id),
                eq(records.map_id, recordData.map_id),
                eq(records.map_id, recordData.map_id),
                eq(records.mode, 'pro'),
                gte(records.place, pointsCalcStart),
                lte(records.place, pointsCalcEnd),
            ),
        );
};
