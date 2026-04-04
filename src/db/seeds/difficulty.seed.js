/* eslint-disable no-console */

import { sql } from "drizzle-orm";

import { db } from "../db-connection.js";
import { difficulty } from "../schema/difficulty.schema.js";

export const seedDifficulty = async () => {
    console.log("\nSeeding Difficulty data...");

    await db.transaction(async (tx) => {
        await tx.execute(sql`TRUNCATE TABLE difficulty RESTART IDENTITY CASCADE;`);

        await tx.insert(difficulty).values([
            { name: "Beginner", multiplier: "0.25" },
            { name: "Easy", multiplier: "0.35" },
            { name: "Easy-Medium", multiplier: "0.50" },
            { name: "Medium", multiplier: "0.70" },
            { name: "Medium-Hard", multiplier: "1.00" },
            { name: "Hard", multiplier: "1.50" },
            { name: "Hard-Extreme", multiplier: "2.20" },
            { name: "Extreme", multiplier: "3.20" },
            { name: "Extreme-Death", multiplier: "4.50" },
            { name: "Death", multiplier: "6.00" },
        ]);
    });

    console.log("Difficulty data seeded.");
};
