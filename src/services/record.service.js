import { and, eq } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { records } from "../db/schema/records.schema.js";

export const checkExistingPlayerRecord = async (recordData) => {
    try {
        const result = await db
            .select({
                id: records.id,
                time: records.time,
                place: records.place,
                points: records.points,
            })
            .from(records)
            .where(
                and(
                    eq(records.player_id, recordData.player_id),
                    eq(records.map_id, recordData.map_id),
                    eq(records.mode, recordData.mode),
                ),
            )
            .limit(1);

        return result[0] ?? null;
    } catch (error) {
        console.error("Error in checkExistingPlayerRecord: ", error);
        throw error;
    }
}

export const insertRecord = async (recordData) => {
    try {
        return await db
            .insert(records)
            .values(recordData)
            .returning();
    } catch (error) {
        console.error("Error in insertRecord: ", error);
        throw error;
    }
}
