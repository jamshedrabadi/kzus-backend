export const mapCreateMapRequest = (mapData) => {
    const mappedMapData = {
        name: mapData.name,
        difficulty_id: mapData.difficultyId,
        length: mapData.length,
        type: mapData.type,
    };

    return mappedMapData;
};
