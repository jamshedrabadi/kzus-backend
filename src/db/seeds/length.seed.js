/* eslint-disable no-console */

import { sql } from "drizzle-orm";

import { db } from "../db-connection.js";
import { length } from "../schema/length.schema.js";

export const seedLength = async () => {
    console.log("\nSeeding Length data...");

    await db.transaction(async (tx) => {
        await tx.execute(sql`TRUNCATE TABLE length RESTART IDENTITY;`);

        await tx.insert(length).values([
            { name: "very-short" },
            { name: "short" },
            { name: "middle" },
            { name: "long" },
            { name: "very-long" },
        ]);
    });

    console.log("Length data seeded.");
};
