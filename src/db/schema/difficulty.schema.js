import {
    pgTable,
    serial,
    varchar,
    integer,
    numeric,
} from "drizzle-orm/pg-core";

export const difficulty = pgTable("difficulty", {
    id:
        serial("id").primaryKey(),
    name:
        varchar({ length: 255 }).notNull(),
    order_index:
        integer().notNull(),
    multiplier:
        numeric({ precision: 4, scale: 2 }).notNull(),
});
