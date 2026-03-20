import { desc, eq, sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { players } from "../db/schema/players.schema.js";
import { maps } from "../db/schema/maps.schema.js";
import { difficulty } from "../db/schema/difficulty.schema.js";
import { length } from "../db/schema/length.schema.js";
import { type } from "../db/schema/type.schema.js";
import { country } from "../db/schema/country.schema.js";
import { records } from "../db/schema/records.schema.js";

export const createPlayerInDb = async (playerData) => {
    try {
        const playerResponse = await db
            .insert(players)
            .values(playerData)
            .returning();

        return playerResponse[0].id;
    } catch (error) {
        console.error("Error in createPlayerInDb: ", error);
        throw error;
    }
};

export const updatePlayerInDb = async (playerId, playerData) => {
    try {
        const playerResponse = await db
            .update(players)
            .set({
                name: playerData.name,
                country_id: playerData.country_id,
                steam_id: playerData.steam_id,
                updated_at: sql`NOW()`,
            })
            .where(
                eq(players.id, playerId),
            )
            .returning();

        return playerResponse[0].id;
    } catch (error) {
        console.error("Error in updatePlayerInDb: ", error);
        throw error;
    }
};

export const getPlayerDataFromDb = async (playerId) => {
    try {
        const result = await db
            .select({
                player_id: players.id,
                player_name: players.name,
                player_steam_id: players.steam_id,
                country_id: country.id,
                country_name: country.name,
                country_code: country.code,
                map_id: maps.id,
                map_name: maps.name,
                difficulty_id: difficulty.id,
                difficulty_name: difficulty.name,
                length_id: length.id,
                length_name: length.name,
                type_id: type.id,
                type_name: type.name,
                record_time: records.time,
                record_place: records.place,
                record_points: records.points,
                record_date: sql`COALESCE(${records.updated_at}, ${records.created_at})`,
                record_mode: records.mode,
                record_cp: records.cp,
                record_gc: records.gc,
                record_improvements: records.improvements,
            })
            .from(players)
            .leftJoin(country,
                eq(country.id, players.country_id),
            )
            .leftJoin(records,
                eq(records.player_id, players.id),
            )
            .leftJoin(maps,
                eq(maps.id, records.map_id),
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
                eq(players.id, playerId),
            )
            .orderBy(
                desc(difficulty.id),
            );

        return result;
    } catch (error) {
        console.error("Error in getPlayerDataFromDb: ", error);
        throw error;
    }
};

export const getPlayerStatsFromDb = async (playerId) => {
    try {
        const result = await db
            .select({
                maps_completed: sql`COUNT(*)`,
                total_points: sql`SUM(points)`,
                average_points_per_map: sql`AVG(points)`,
                top1_times: sql`COUNT(*) FILTER (WHERE place = 1)`,
                top2_times: sql`COUNT(*) FILTER (WHERE place = 2)`,
                top3_times: sql`COUNT(*) FILTER (WHERE place = 3)`,
                average_rank: sql`AVG(place)`,
                best_rank: sql`MIN(place)`,
                worst_rank: sql`MAX(place)`,
                total_improvements: sql`SUM(improvements)`,
            })
            .from(records)
            .where(
                eq(records.player_id, playerId),
                eq(records.mode, 'pro'),
            );

        return result[0];
    } catch (error) {
        console.error("Error in getPlayerStatsFromDb: ", error);
        throw error;
    }
};

export const getPlayerListFromDb = async () => {
    try {
        const result = db
            .select({
                player_id: players.id,
                player_name: players.name,
                country_id: country.id,
                country_name: country.name,
                country_code: country.code,
                pro_runs: sql`COUNT(*)`,
                top1_count: sql`COUNT(*) FILTER (WHERE ${records.place} = 1)`,
                top2_count: sql`COUNT(*) FILTER (WHERE ${records.place} = 2)`,
                top3_count: sql`COUNT(*) FILTER (WHERE ${records.place} = 3)`,
                total_points: sql`SUM(${records.points})`,
                last_record_date_time: sql`MAX(COALESCE(${records.updated_at}, ${records.created_at}))`,
            })
            .from(records)
            .innerJoin(players,
                eq(players.id, records.player_id),
            )
            .innerJoin(country,
                eq(country.id, players.country_id),
            )
            .where(
                eq(records.mode, "pro"),
            )
            .groupBy(
                players.id,
                players.name,
                country.id,
                country.name,
                country.code,
            )
            .orderBy(
                desc(sql`SUM(${records.points})`),
            );

        return await result;
    } catch (error) {
        console.error("Error in getPlayerListFromDb: ", error);
        throw error;
    }
};
