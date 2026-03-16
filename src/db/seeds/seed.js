/* eslint-disable no-console */

import "dotenv/config";

import { db } from "../db-connection.js";
import { difficulty } from "../schema/difficulty.schema.js";

export const seed = async () => {
    await db.insert(difficulty).values([
        { name: "beginner", multiplier: "0.25" },
        { name: "easy", multiplier: "0.35" },
        { name: "easy-medium", multiplier: "0.50" },
        { name: "medium", multiplier: "0.70" },
        { name: "medium-hard", multiplier: "1.00" },
        { name: "hard", multiplier: "1.50" },
        { name: "hard-extreme", multiplier: "2.20" },
        { name: "extreme", multiplier: "3.20" },
        { name: "extreme-death", multiplier: "4.50" },
        { name: "death", multiplier: "6.00" },
    ]);

    console.log("Difficulty data seeded.");
};

await seed();

process.exit(0);




