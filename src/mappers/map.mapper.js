import {
    formatDbDateToDate,
    convertToNumber,
    convertToDecimalNumber,
} from "../utils/common.utils.js";
import {
    COUNTRY_FLAG_DIMENSION,
    COUNTRY_FLAG_URL,
} from "../constants/country.constants.js";

export const mapCreateOrUpdateMapRequest = (mapData) => {
    const mappedMapData = {
        name: mapData.name,
        difficulty_id: mapData.difficultyId,
        length_id: mapData.lengthId,
        type_id: mapData.typeId,
    };

    return mappedMapData;
};

export const mapGetMapResponse = (mapData, mapStats) => {
    const mappedMapData = {
        map: {
            name: mapData[0].map_name,
            difficultyName: mapData[0].difficulty_name,
            lengthName: mapData[0].length_name,
            typeName: mapData[0].type_name,
        },
        records: mapData.reduce((acc, rec) => {
            if (!rec.player_id) {
                return acc;
            };
            const record = {
                playerId: rec.player_id,
                playerName: rec.player_name,
                countryId: rec.country_id,
                countryName: rec.country_name,
                countryCode: rec.country_code,
                countryFlag:
                    `${COUNTRY_FLAG_URL}/${COUNTRY_FLAG_DIMENSION}/${rec.country_code}.png`,
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
            totalRuns: convertToNumber(mapStats.total_runs),
            timeSpread: convertToNumber(mapStats.time_spread),
            averageImprovements: convertToDecimalNumber(mapStats.average_improvements),
        },
    };

    return mappedMapData;
};
