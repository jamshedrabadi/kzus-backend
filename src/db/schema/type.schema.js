import {
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

export const type = pgTable("type", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),
});
