import { eq, sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { maps } from "../db/schema/maps.schema.js";
import { difficulty } from "../db/schema/difficulty.schema.js";
import { length } from "../db/schema/length.schema.js";
import { type } from "../db/schema/type.schema.js";
import { players } from "../db/schema/players.schema.js";
import { country } from "../db/schema/country.schema.js";
import { records } from "../db/schema/records.schema.js";
import { worldRecords } from "../db/schema/world_records.schema.js";
import {
    RECORD_MODE_PRO,
} from "../constants/record.constants.js";

export const createMapInDb = async (mapData) => {
    try {
        const mapResponse = await db
            .insert(maps)
            .values(mapData)
            .returning();

        return mapResponse[0].id;
    } catch (error) {
        console.error("Error in createMapInDb: ", error);
        throw error;
    }
};

export const updateMapInDb = async (mapId, mapData) => {
    try {
        const mapResponse = await db
            .update(maps)
            .set({
                name: mapData.name,
                difficulty_id: mapData.difficulty_id,
                length_id: mapData.length_id,
                type_id: mapData.type_id,
                updated_at: sql`NOW()`,
            })
            .where(
                eq(maps.id, mapId),
            )
            .returning();

        return mapResponse[0].id;
    } catch (error) {
        console.error("Error in updateMapInDb: ", error);
        throw error;
    }
};

export const getMapDataFromDb = async (mapId) => {
    try {
        const result = await db
            .select({
                map_id: maps.id,
                map_name: maps.name,
                difficulty_id: difficulty.id,
                difficulty_name: difficulty.name,
                length_id: length.id,
                length_name: length.name,
                type_id: type.id,
                type_name: type.name,
                player_id: players.id,
                player_name: players.name,
                country_id: country.id,
                country_name: country.name,
                country_code: country.code,
                record_time: records.time,
                record_place: records.place,
                record_points: records.points,
                record_date: sql`COALESCE(${records.updated_at}, ${records.created_at})`,
                record_mode: records.mode,
                record_cp: records.cp,
                record_gc: records.gc,
                record_improvements: records.improvements,
            })
            .from(maps)
            .leftJoin(records,
                eq(records.map_id, maps.id),
            )
            .leftJoin(players,
                eq(players.id, records.player_id),
            )
            .leftJoin(country,
                eq(country.id, players.country_id),
            )
            .leftJoin(difficulty,
                eq(difficulty.id, maps.difficulty_id),
            )
            .leftJoin(length,
                eq(length.id, maps.length_id),
            )
            .leftJoin(type,
                eq(type.id, maps.type_id),
            )
            .where(
                eq(maps.id, mapId),
            )
            .orderBy(records.place);

        return result;
    } catch (error) {
        console.error("Error in getMapDataFromDb: ", error);
        throw error;
    }
};

export const getMapStatsFromDb = async (mapId) => {
    try {
        const result = await db
            .select({
                total_runs: sql`COUNT(*)`,
                time_spread: sql`MAX(time) - MIN(time)`,
                average_improvements: sql`AVG(improvements)`,
            })
            .from(records)
            .where(
                eq(records.map_id, mapId),
                eq(records.mode, RECORD_MODE_PRO),
            );

        return result[0];
    } catch (error) {
        console.error("Error in getMapStatsFromDb: ", error);
        throw error;
    }
};

export const getMapWorldRecordsFromDb = async (mapId) => {
    try {
        const result = await db
            .select({
                source: worldRecords.source,
                map_route: worldRecords.map_route,
                time: worldRecords.time,
                player_name: worldRecords.player_name,
                country_code: worldRecords.country_code,
                record_date: worldRecords.record_date,
            })
            .from(worldRecords)
            .where(
                eq(worldRecords.map_id, mapId),
            );

        return result;
    } catch (error) {
        console.error("Error in getMapWorldRecordsFromDb: ", error);
        throw error;
    }
};

export const getMapListFromDb = async () => {
    try {
        const result = db
            .select({
                map_id: maps.id,
                map_name: maps.name,
                difficulty_id: difficulty.id,
                difficulty_name: difficulty.name,
                length_id: length.id,
                length_name: length.name,
                type_id: type.id,
                type_name: type.name,
                created_at: maps.created_at,
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
            .orderBy(maps.name);

        return await result;
    } catch (error) {
        console.error("Error in getMapListFromDb: ", error);
        throw error;
    }
};
