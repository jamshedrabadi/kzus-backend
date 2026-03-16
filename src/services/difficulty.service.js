import { db } from "../db/db-connection.js";
import { difficulty } from "../db/schema/difficulty.schema.js";

export const getDifficultyListFromDb = async () => {
    try {
        const result = await db
            .select({
                difficulty_id: difficulty.id,
                difficulty_name: difficulty.name,
                difficulty_multiplier: difficulty.multiplier,
            })
            .from(difficulty)
            .orderBy(difficulty.id);

        return result;
    } catch (error) {
        console.error("Error in getDifficultyListFromDb: ", error);
        throw error;
    }
};
