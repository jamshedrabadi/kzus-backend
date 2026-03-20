import {
    convertToNumber,
    convertToDecimalNumber,
} from "../utils/common.utils.js";
import {
    COUNTRY_FLAG_URL,
    COUNTRY_FLAG_EXTENSION,
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
            mapId: mapData[0].map_id,
            mapName: mapData[0].map_name,
            difficultyId: mapData[0].difficulty_id,
            difficultyName: mapData[0].difficulty_name,
            lengthId: mapData[0].length_id,
            lengthName: mapData[0].length_name,
            typeId: mapData[0].type_id,
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
                countryFlag: `${COUNTRY_FLAG_URL}${rec.country_code}${COUNTRY_FLAG_EXTENSION}`,
                recordTime: rec.record_time,
                recordPlace: rec.record_place,
                recordPoints: rec.record_points,
                recordDate: rec.record_date,
                recordCp: rec.record_cp,
                recordGc: rec.record_gc,
                recordImprovements: rec.record_improvements,
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

export const mapGetMapListResponse = (mapList) => {
    const mappedMapList = mapList.map((map) => {
        return {
            mapId: map.map_id,
            mapName: map.map_name,
            difficultyId: map.difficulty_id,
            difficultyName: map.difficulty_name,
            lengthId: map.length_id,
            lengthName: map.length_name,
            typeId: map.type_id,
            typeName: map.type_name,
            mapCreationDate: map.created_at,
        };
    });

    return mappedMapList;
};
