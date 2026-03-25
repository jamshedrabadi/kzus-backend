/* eslint-disable no-console */

import { syncWorldRecords } from "../../services/world_record.service.js";

export const seedWorldRecord = async () => {
    console.log("\nSeeding World Record data...");

    await syncWorldRecords(false);
};
