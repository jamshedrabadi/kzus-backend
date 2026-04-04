/* eslint-disable no-console */

import { sql } from "drizzle-orm";

import { db } from "../db-connection.js";
import { length } from "../schema/length.schema.js";

export const seedLength = async () => {
    console.log("\nSeeding Length data...");

    await db.transaction(async (tx) => {
        await tx.execute(sql`TRUNCATE TABLE length RESTART IDENTITY CASCADE;`);

        await tx.insert(length).values([
            { name: "Very-Short" },
            { name: "Short" },
            { name: "Middle" },
            { name: "Long" },
            { name: "Very-Long" },
        ]);
    });

    console.log("Length data seeded.");
};
