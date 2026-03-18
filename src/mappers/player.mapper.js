import {
    formatDbDateToDate,
    convertToNumber,
    convertToDecimalNumber,
} from "../utils/common.utils.js";
import {
    COUNTRY_FLAG_DIMENSION,
    COUNTRY_FLAG_URL,
} from "../constants/country.constants.js";

export const mapCreateOrUpdatePlayerRequest = (playerData) => {
    const mappedPlayerData = {
        name: playerData.name,
        country_id: playerData.countryId,
        steam_id: playerData.steamId,
    };

    return mappedPlayerData;
};

export const mapGetPlayerResponse = (playerData, playerStats) => {
    const mappedPlayerData = {
        player: {
            name: playerData[0].player_name,
            steamId: playerData[0].player_steam_id,
            countryId: playerData[0].country_id,
            countryName: playerData[0].country_name,
            countryCode: playerData[0].country_code,
            countryFlag:
                `${COUNTRY_FLAG_URL}/${COUNTRY_FLAG_DIMENSION}/${playerData[0].country_code}.png`,
        },
        records: playerData.reduce((acc, rec) => {
            if (!rec.map_id) {
                return acc;
            };
            const record = {
                mapId: rec.map_id,
                mapName: rec.map_name,
                difficultyName: rec.difficulty_name,
                lengthName: rec.length_name,
                typeName: rec.type_name,
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
        stats: {
            mapsCompleted: convertToNumber(playerStats.maps_completed),
            totalPoints: convertToNumber(playerStats.total_points),
            averagePointsPerMap: convertToDecimalNumber(playerStats.average_points_per_map),
            top1Times: convertToNumber(playerStats.top1_times),
            top2Times: convertToNumber(playerStats.top2_times),
            top3Times: convertToNumber(playerStats.top3_times),
            averageRank: convertToDecimalNumber(playerStats.average_rank),
            bestRank: convertToNumber(playerStats.best_rank),
            worstRank: convertToNumber(playerStats.worst_rank),
            totalImprovements: convertToNumber(playerStats.total_improvements),
        },
    };

    return mappedPlayerData;
};
