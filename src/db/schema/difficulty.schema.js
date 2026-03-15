import {
    pgTable,
    serial,
    varchar,
    integer,
    numeric,
} from "drizzle-orm/pg-core";

export const difficulty = pgTable("difficulty", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    order_index: integer("order_index").notNull(),

    multiplier: numeric("multiplier", { precision: 4, scale: 2 }).notNull(),
});
