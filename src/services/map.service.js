import { db } from "../db/db-connection.js";
import { maps } from "../db/schema/maps.schema.js";

export const createMapInDb = async (mapData) => {
    try {
        return await db
            .insert(maps)
            .values(mapData)
            .returning();
    } catch (error) {
        console.error("Error in createMapInDb: ", error);
        throw error;
    }
};
