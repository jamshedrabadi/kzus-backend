/* eslint-disable no-console */

import { sql } from "drizzle-orm";

import { db } from "../db-connection.js";
import {
    fetchWorldRecordApisData,
    insertWorldRecordData,
} from "../../services/world_record.service.js";

export const seedWorldRecord = async () => {
    console.log("\nSeeding World Record data...");

    await db.execute(sql`DELETE FROM world_records;`);
    await db.execute(sql`ALTER SEQUENCE world_records_id_seq RESTART WITH 1;`);

    const worldRecordData = await fetchWorldRecordApisData();

    if (worldRecordData.length) {
        await insertWorldRecordData(worldRecordData);
    } else {
        console.log("Error seeding World Record data.");
    }

    console.log("World Record data seeded.");
};
