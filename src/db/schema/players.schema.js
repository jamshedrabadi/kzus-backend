import {
    pgTable,
    serial,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";

export const players = pgTable("players", {
    id:
        serial("id").primaryKey(),
    name:
        varchar({ length: 255 }).notNull(),
    country:
        varchar({ length: 3 }).notNull(),
    steam_id:
        varchar({ length: 17 }).notNull().unique(),
    created_at:
        timestamp().defaultNow(),
});
