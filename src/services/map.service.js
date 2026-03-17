import { eq, sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { maps } from "../db/schema/maps.schema.js";
import { difficulty } from "../db/schema/difficulty.schema.js";
import { players } from "../db/schema/players.schema.js";
import { country } from "../db/schema/country.schema.js";
import { records } from "../db/schema/records.schema.js";

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
                length: mapData.length,
                type: mapData.type,
                updated_at: new Date(),
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
                map_name: maps.name,
                map_length: maps.length,
                map_type: maps.type,
                difficulty_name: difficulty.name,
                player_id: players.id,
                player_name: players.name,
                country_id: country.id,
                country_name: country.name,
                country_code: country.code,
                record_time: records.time,
                record_place: records.place,
                record_points: records.points,
                record_created_at: records.created_at,
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
                average_time: sql`AVG(time)`,
                median_time: sql`PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY time)`,
                average_improvements: sql`AVG(improvements)`,
                time_spread: sql`MAX(time) - MIN(time)`,
            })
            .from(records)
            .where(
                eq(records.map_id, mapId),
                eq(records.mode, 'pro'),
            );

        return result[0];
    } catch (error) {
        console.error("Error in getMapStatsFromDb: ", error);
        throw error;
    }
};
