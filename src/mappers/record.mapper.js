export const mapUpsertRecordRequest = (recordData) => {
    const mappedRecordData = {
        player_id: recordData.playerId,
        map_id: recordData.mapId,
        time: recordData.time,
        mode: recordData.mode,
        cp: recordData.cp,
        gc: recordData.gc,
    };

    return mappedRecordData;
};
