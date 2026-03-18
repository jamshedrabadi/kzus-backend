import { db } from "../db/db-connection.js";
import { type } from "../db/schema/type.schema.js";

export const getTypeListFromDb = async () => {
    try {
        const result = await db
            .select({
                type_id: type.id,
                type_name: type.name,
            })
            .from(type)
            .orderBy(type.id);

        return result;
    } catch (error) {
        console.error("Error in getTypeListFromDb: ", error);
        throw error;
    }
};
