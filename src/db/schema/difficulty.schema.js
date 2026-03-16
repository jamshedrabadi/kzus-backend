import {
    pgTable,
    serial,
    varchar,
    numeric,
} from "drizzle-orm/pg-core";

export const difficulty = pgTable("difficulty", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    multiplier: numeric("multiplier", { precision: 4, scale: 2 }).notNull(),
});
