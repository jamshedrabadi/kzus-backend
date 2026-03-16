import {
    formatDbDateToDate,
} from "../utils/common.utils.js";

export const mapCreateOrUpdatePlayerRequest = (playerData) => {
    const mappedPlayerData = {
        name: playerData.name,
        country_id: playerData.countryId,
        steam_id: playerData.steamId,
    };

    return mappedPlayerData;
};

export const mapGetPlayerResponse = (playerData) => {
    const mappedPlayerData = {
        player: {
            name: playerData[0].player_name,
            steamId: playerData[0].player_steam_id,
            countryId: playerData[0].country_id,
            countryName: playerData[0].country_name,
            countryCode: playerData[0].country_code,
        },
        records: playerData.reduce((acc, rec) => {
            if (!rec.map_id) {
                return acc;
            };
            const record = {
                mapId: rec.map_id,
                mapName: rec.map_name,
                difficultyName: rec.difficulty_name,
                time: rec.record_time,
                place: rec.record_place,
                points: rec.record_points,
                createdAt: formatDbDateToDate(rec.record_created_at),
                cp: rec.record_cp,
                gc: rec.record_gc,
                improvements: rec.record_improvements,
            };

            acc[rec.record_mode].push(record);

            return acc;
        }, { pro: [], nub: [] }),
    };

    return mappedPlayerData;
};
