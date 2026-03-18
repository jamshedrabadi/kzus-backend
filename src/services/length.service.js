import { db } from "../db/db-connection.js";
import { length } from "../db/schema/length.schema.js";

export const getLengthListFromDb = async () => {
    try {
        const result = await db
            .select({
                length_id: length.id,
                length_name: length.name,
            })
            .from(length)
            .orderBy(length.id);

        return result;
    } catch (error) {
        console.error("Error in getLengthListFromDb: ", error);
        throw error;
    }
};
