import dbModels from "../models/index.js";

export const createMapInDb = async (mapData) => {
    try {
        return await dbModels.Maps.create(mapData);
    } catch (error) {
        console.error("Error in createMapInDb: ", error);
        throw error;
    }
}