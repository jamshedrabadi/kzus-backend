import { eq } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { maps } from "../db/schema/maps.schema.js";
import { difficulty } from "../db/schema/difficulty.schema.js";
import { players } from "../db/schema/players.schema.js";
import { records } from "../db/schema/records.schema.js";

export const createMapInDb = async (mapData) => {
    try {
        return await db
            .insert(maps)
            .values(mapData)
            .returning();
    } catch (error) {
        console.error("Error in createMapInDb: ", error);
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
                difficulty_order_index: difficulty.order_index,
                difficulty_name: difficulty.name,
                player_id: players.id,
                player_name: players.name,
                player_country: players.country,
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
