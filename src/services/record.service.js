import { and, eq, gte, lt, lte, sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { records } from "../db/schema/records.schema.js";
import { maps } from "../db/schema/maps.schema.js";
import { players } from "../db/schema/players.schema.js";
import { difficulty } from "../db/schema/difficulty.schema.js";
import { length } from "../db/schema/length.schema.js";
import { type } from "../db/schema/type.schema.js";
import {
    RECORD_BASE_POINTS,
    RECORD_MODE_LOCK_VALUES,
    RECORD_MODE_PRO,
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
            if (recordData.mode === RECORD_MODE_PRO && pointsCalcStart && pointsCalcEnd) {
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
    try {
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
    } catch (error) {
        console.error("Error in checkExistingRecord: ", error);
        throw error;
    }
};

export const getNewRank = async (tx, recordData) => {
    try {
        const rankResult = await tx
            .select({
                rank: sql`COUNT(*) + 1`,
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
    } catch (error) {
        console.error("Error in getNewRank: ", error);
        throw error;
    }
};

export const getRecordsOnMap = async (tx, recordData) => {
    try {
        const recordsResult = await tx
            .select({
                total: sql`COUNT(*)`,
            })
            .from(records)
            .where(
                and(
                    eq(records.map_id, recordData.map_id),
                    eq(records.mode, recordData.mode),
                ),
            );

        return Number(recordsResult[0].total);
    } catch (error) {
        console.error("Error in getRecordsOnMap: ", error);
        throw error;
    }
};

export const incrementSlowerTimes = async (tx, recordData, newRank, oldRank = null) => {
    try {
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
    } catch (error) {
        console.error("Error in incrementSlowerTimes: ", error);
        throw error;
    }
};

export const insertRecord = async (tx, recordData, newRank) => {
    try {
        return await tx
            .insert(records)
            .values({
                ...recordData,
                place: newRank,
                points: 0,
            });
    } catch (error) {
        console.error("Error in insertRecord: ", error);
        throw error;
    }
};

export const updateRecord = async (tx, recordData, newRank, playerRecordId) => {
    try {
        return await tx
            .update(records)
            .set({
                time: recordData.time,
                place: newRank,
                improvements: sql`${records.improvements} + 1`,
                updated_at: sql`NOW()`,
            })
            .where(
                eq(records.id, playerRecordId),
            );
    } catch (error) {
        console.error("Error in updateRecord: ", error);
        throw error;
    }
};

export const recalculatePoints = async (
    tx, recordData, totalRecords, pointsCalcStart, pointsCalcEnd) => {

    try {
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
                    eq(records.mode, RECORD_MODE_PRO),
                    gte(records.place, pointsCalcStart),
                    lte(records.place, pointsCalcEnd),
                ),
            );
    } catch (error) {
        console.error("Error in recalculatePoints: ", error);
        throw error;
    }
};

export const getRecordListFromDb = async () => {
    try {
        const query = db
            .select({
                map_id: maps.id,
                map_name: maps.name,
                player_id: players.id,
                player_name: players.name,
                record_time: records.time,
                record_date: sql`COALESCE(${records.updated_at}, ${records.created_at})`,
                difficulty_id: difficulty.id,
                difficulty_name: difficulty.name,
                length_id: length.id,
                length_name: length.name,
                type_id: type.id,
                type_name: type.name,
            })
            .from(maps)
            .leftJoin(difficulty,
                eq(difficulty.id, maps.difficulty_id),
            )
            .leftJoin(length,
                eq(length.id, maps.length_id),
            )
            .leftJoin(type,
                eq(type.id, maps.type_id),
            )
            .leftJoin(records,
                and(
                    eq(records.map_id, maps.id),
                    eq(records.mode, RECORD_MODE_PRO),
                    eq(records.place, 1),
                ),
            )
            .leftJoin(players,
                eq(players.id, records.player_id),
            );

        return await query;
    } catch (error) {
        console.error("Error in getRecordListFromDb: ", error);
        throw error;
    }
};
