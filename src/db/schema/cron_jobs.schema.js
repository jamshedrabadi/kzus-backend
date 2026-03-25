import {
    pgTable,
    pgEnum,
    serial,
    varchar,
    integer,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

import { CRON_JOB_STATUSES } from "../../constants/cron_job.constants.js";

export const statusEnum = pgEnum("status", CRON_JOB_STATUSES);

export const cronJobs = pgTable("cron_jobs", {
    id: serial("id").primaryKey(),

    job_name: varchar("name", { length: 255 }).notNull(),

    status: statusEnum("status").notNull(),

    records_processed: integer("records_processed"),

    started_at: timestamp("started_at", { withTimezone: true }).notNull(),

    finished_at: timestamp("finished_at", { withTimezone: true }),

    error_message: text("error_message"),
});
