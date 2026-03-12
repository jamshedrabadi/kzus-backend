import { desc, eq } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { players } from "../db/schema/players.schema.js";
import { records } from "../db/schema/records.schema.js";
import { maps } from "../db/schema/maps.schema.js";
import { difficulty } from "../db/schema/difficulty.schema.js";

export const createPlayerInDb = async (playerData) => {
    try {
        return await db
            .insert(players)
            .values(playerData)
            .returning();
    } catch (error) {
        console.error("Error in createPlayerInDb: ", error);
        throw error;
    }
}

export const getPlayerDataFromDb = async (playerId) => {
    try {
        const result = await db
            .select({
                player_name: players.name,
                player_country: players.country,
                player_steam_id: players.steam_id,
                map_name: maps.name,
                difficulty_order_index: difficulty.order_index,
                difficulty_name: difficulty.id,
                record_time: records.time,
                record_place: records.place,
                record_points: records.points,
                record_created_at: records.created_at,
                record_mode: records.mode,
                record_cp: records.cp,
                record_gc: records.gc,
            })
            .from(players)
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
                desc(difficulty.order_index),
            )

        return result;
    } catch (error) {
        console.error("Error in getPlayerDataFromDb: ", error);
        throw error;
    }
}
