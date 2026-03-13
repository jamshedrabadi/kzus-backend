/* eslint-disable no-console */

import "dotenv/config";

import { db } from "../db-connection.js";
import { difficulty } from "../schema/difficulty.schema.js";

export const seed = async () => {
    await db.insert(difficulty).values([
        { name: "beginner", order_index: 1, multiplier: "0.25" },
        { name: "easy", order_index: 2, multiplier: "0.35" },
        { name: "easy-medium", order_index: 3, multiplier: "0.50" },
        { name: "medium", order_index: 4, multiplier: "0.70" },
        { name: "medium-hard", order_index: 5, multiplier: "1.00" },
        { name: "hard", order_index: 6, multiplier: "1.50" },
        { name: "hard-extreme", order_index: 7, multiplier: "2.20" },
        { name: "extreme", order_index: 8, multiplier: "3.20" },
        { name: "extreme-death", order_index: 9, multiplier: "4.50" },
        { name: "death", order_index: 10, multiplier: "6.00" },
    ]);

    console.log("Data seeded");
};

await seed();

process.exit(0);




