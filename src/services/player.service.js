import { dbModels } from "../models/index.js";

export const storePlayer = async (playerData) => {
    try {
        return await dbModels().Players.create(playerData);
    } catch (error) {
        console.error("Error in storePlayer: ", error);
        throw error;
    }
}