import dbModels from "../models/index.js";

export const checkExistingPlayerRecord = async (recordData) => {
    try {
        return await dbModels.Records.findOne({
            attributes: ["id", "time", "place", "points"],
            where: {
                player_id: recordData.player_id,
                map_id: recordData.map_id,
                mode: recordData.mode,
            },
        });
    } catch (error) {
        console.error("Error in checkExistingPlayerRecord: ", error);
        throw error;
    }
}

export const insertRecord = async (recordData) => {
    try {
        return await dbModels.Records.create(recordData);
    } catch (error) {
        console.error("Error in insertRecord: ", error);
        throw error;
    }
}
