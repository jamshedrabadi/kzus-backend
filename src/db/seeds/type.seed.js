/* eslint-disable no-console */

import { sql } from "drizzle-orm";

import { db } from "../db-connection.js";
import { type } from "../schema/type.schema.js";

export const seedType = async () => {
    console.log("\nSeeding Type data...");

    await db.transaction(async (tx) => {
        await tx.execute(sql`TRUNCATE TABLE type RESTART IDENTITY;`);

        await tx.insert(type).values([
            { name: "climb" },
            { name: "bhop" },
            { name: "slide" },
            { name: "mix" },
            { name: "special" },
        ]);
    });

    console.log("Type data seeded.");
};
