import { dbModels } from "../models/index.js";

export const createMapRecord = async (mapData) => {
    try {
        return await dbModels().Maps.create(mapData);
    } catch (error) {
        console.error("Error in createMapRecord: ", error);
        throw error;
    }
}