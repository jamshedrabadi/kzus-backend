/* eslint-disable no-console */

import { sql } from "drizzle-orm";

import { db } from "../db-connection.js";
import { type } from "../schema/type.schema.js";

export const seedType = async () => {
    console.log("\nSeeding Type data...");

    await db.transaction(async (tx) => {
        await tx.execute(sql`TRUNCATE TABLE type RESTART IDENTITY CASCADE;`);

        await tx.insert(type).values([
            { name: "Climb" },
            { name: "Bhop" },
            { name: "Slide" },
            { name: "Mix" },
            { name: "Special" },
        ]);
    });

    console.log("Type data seeded.");
};
