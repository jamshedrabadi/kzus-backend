import { dbModels } from "../models/index.js";

export const storeMap = async (mapData) => {
    try {
        return await dbModels().Maps.create(mapData);
    } catch (error) {
        console.error("Error in storeMap: ", error);
        throw error;
    }
}