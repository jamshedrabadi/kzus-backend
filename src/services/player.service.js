import { dbModels } from "../models/index.js";

export const createPlayerRecord = async (playerData) => {
    try {
        return await dbModels().Players.create(playerData);
    } catch (error) {
        console.error("Error in createPlayerRecord: ", error);
        throw error;
    }
}