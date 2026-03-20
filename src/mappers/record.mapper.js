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

export const mapGetRecordListResponse = (recordList) => {
    const mappedRecordList = recordList.map((record) => {
        return {
            mapId: record.map_id,
            mapName: record.map_name,
            playerId: record.player_id,
            playerName: record.player_name,
            recordTime: record.record_time,
            recordDate: record.record_date,
            difficultyId: record.difficulty_id,
            difficultyName: record.difficulty_name,
            lengthId: record.length_id,
            lengthName: record.length_name,
            typeId: record.type_id,
            typeName: record.type_name,
        };
    });

    return mappedRecordList;
};
