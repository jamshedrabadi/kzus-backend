/* eslint-disable no-console */

import cron from "node-cron";

import { syncWorldRecords } from "../services/world_record.service.js";
import {
    WORLD_RECORD_CRON_SCHEDULE,
    WORLD_RECORD_CRON_TIMEZONE,
} from "../constants/world_record.constants.js";

cron.schedule(WORLD_RECORD_CRON_SCHEDULE, async () => {
    console.log("[CRON] World Record sync started");

    try {
        await syncWorldRecords(true);
        console.log("[CRON] World Record sync completed");
    } catch (error) {
        console.error("[CRON] World Record sync failed:", error);
    }
}, {
    timezone: WORLD_RECORD_CRON_TIMEZONE,
});