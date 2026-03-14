import {
    formatDbDateToDate,
} from "../utils/common.utils.js";

export const mapCreatePlayerRequest = (playerData) => {
    const mappedPlayerData = {
        name: playerData.name,
        country: playerData.country,
        steam_id: playerData.steamId,
    };

    return mappedPlayerData;
};

export const mapGetPlayerResponse = (playerData) => {
    const mappedPlayerData = {
        player: {
            name: playerData[0].player_name,
            country: playerData[0].player_country,
            steamId: playerData[0].player_steam_id,
        },
        records: playerData.reduce((acc, rec) => {
            if (!rec.map_id) {
                return acc;
            };
            const record = {
                mapId: rec.map_id,
                mapName: rec.map_name,
                difficultyOrderIndex: rec.difficulty_order_index,
                difficultyName: rec.difficulty_name,
                time: rec.record_time,
                place: rec.record_place,
                points: rec.record_points,
                createdAt: formatDbDateToDate(rec.record_created_at),
                cp: rec.record_cp,
                gc: rec.record_gc,
            };

            acc[rec.record_mode].push(record);

            return acc;
        }, { pro: [], nub: [] }),
    };

    return mappedPlayerData;
};
