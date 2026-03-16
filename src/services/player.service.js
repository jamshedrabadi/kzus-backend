import { desc, eq } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { players } from "../db/schema/players.schema.js";
import { maps } from "../db/schema/maps.schema.js";
import { difficulty } from "../db/schema/difficulty.schema.js";
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
                updated_at: new Date(),
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
                player_name: players.name,
                player_steam_id: players.steam_id,
                country_id: country.id,
                country_name: country.name,
                country_code: country.code,
                map_id: maps.id,
                map_name: maps.name,
                difficulty_name: difficulty.name,
                record_time: records.time,
                record_place: records.place,
                record_points: records.points,
                record_created_at: records.created_at,
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
