import {
    formatDbDateToDate,
} from "../utils/common.utils.js";

export const mapCreateMapRequest = (mapData) => {
    const mappedMapData = {
        name: mapData.name,
        difficulty_id: mapData.difficultyId,
        length: mapData.length,
        type: mapData.type,
    };

    return mappedMapData;
};

export const mapGetMapResponse = (mapData) => {
    const mappedMapData = {
        map: {
            name: mapData[0].map_name,
            length: mapData[0].map_length,
            type: mapData[0].map_type,
            difficultyOrderIndex: mapData[0].difficulty_order_index,
            difficultyName: mapData[0].difficulty_name,
        },
        records: mapData.reduce((acc, map) => {
            if (!map.player_id) {
                return acc;
            };
            const record = {
                playerId: map.player_id,
                playerName: map.player_name,
                playerCountry: map.player_country,
                time: map.record_time,
                place: map.record_place,
                points: map.record_points,
                createdAt: formatDbDateToDate(map.record_created_at),
                cp: map.record_cp,
                gc: map.record_gc,
            };

            acc[map.record_mode].push(record);

            return acc;
        }, { pro: [], nub: [] }),
    };

    return mappedMapData;
};
