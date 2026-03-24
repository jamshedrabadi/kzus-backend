/* eslint-disable no-console */

import { sql } from "drizzle-orm";

import { db } from "../db-connection.js";
import { type } from "../schema/type.schema.js";

export const seedType = async () => {
    console.log("\nSeeding Type data...");

    await db.execute(sql`DELETE FROM type;`);
    await db.execute(sql`ALTER SEQUENCE type_id_seq RESTART WITH 1;`);

    await db.insert(type).values([
        { name: "climb" },
        { name: "bhop" },
        { name: "slide" },
        { name: "mix" },
        { name: "special" },
    ]);

    console.log("Type data seeded.");
};
