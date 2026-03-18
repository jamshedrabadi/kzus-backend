import {
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

export const length = pgTable("length", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),
});
