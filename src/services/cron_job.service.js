import { db } from "../db/db-connection.js";
import { cronJobs } from "../db/schema/cron_jobs.schema.js";

export const storeCronJobInDb = async (cronJobData) => {
    return await db
        .insert(cronJobs)
        .values(cronJobData);
};
