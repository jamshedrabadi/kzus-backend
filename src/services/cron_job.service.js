import { db } from "../db/db-connection.js";
import { cronJobs } from "../db/schema/cron_jobs.schema.js";

export const storeCronJobInDb = async (cronJobData) => {
    try {
        return await db
            .insert(cronJobs)
            .values(cronJobData);
    } catch (error) {
        console.error("Error in storeCronJobInDb: ", error);
        throw error;
    }
};
