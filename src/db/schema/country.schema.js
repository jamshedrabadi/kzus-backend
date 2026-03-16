import {
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

export const country = pgTable("country", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    code: varchar("code", { length: 255 }).notNull(),
});
