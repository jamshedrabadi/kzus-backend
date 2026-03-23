/* eslint-disable no-console */

import { sql } from "drizzle-orm";

import { db } from "../db-connection.js";
import { length } from "../schema/length.schema.js";

export const seedLength = async () => {
    await db.execute(sql`DELETE FROM length;`);
    await db.execute(sql`ALTER SEQUENCE length_id_seq RESTART WITH 1;`);

    await db.insert(length).values([
        { name: "very-short" },
        { name: "short" },
        { name: "middle" },
        { name: "long" },
        { name: "very-long" },
    ]);

    console.log("Length data seeded.");
};
