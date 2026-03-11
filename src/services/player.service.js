import { QueryTypes } from "sequelize";

import { sequelize } from "../config/db-config.js";
import dbModels from "../models/index.js";

export const createPlayerInDb = async (playerData) => {
    try {
        return await dbModels.Players.create(playerData);
    } catch (error) {
        console.error("Error in createPlayerInDb: ", error);
        throw error;
    }
}

export const getPlayerDataFromDb = async (playerId) => {
    try {
        return await sequelize.query(`
            SELECT
                p.name as player_name,
                p.country as player_country,
                p.steam_id as player_steam_id,
                m.name as map_name,
                m.difficulty_id as map_difficulty_id, -- remove later
                r.time as record_time,
                r.place as record_place,
                r.created_at as record_created_at,
                r.mode as record_mode,
                r.cp as record_cp,
                r.gc as record_gc
            FROM
                players p
                LEFT JOIN records r ON r.player_id = p.id
                LEFT JOIN maps m ON m.id = r.map_id
            WHERE
                p.id = :playerId
            ORDER BY
                m.difficulty_id DESC
        `,
            {
                replacements: { playerId },
                type: QueryTypes.SELECT,
            });
    } catch (error) {
        console.error("Error in getPlayerDataFromDb: ", error);
        throw error;
    }
}
