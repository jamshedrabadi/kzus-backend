import {
    uniqueIndex,
    index,
    pgTable,
    serial,
    varchar,
    integer,
    date,
} from "drizzle-orm/pg-core";

import { maps } from "./maps.schema.js";
import { country } from "./country.schema.js";

export const worldRecords = pgTable("world_records", {
    id: serial("id").primaryKey(),

    source: varchar("source", { length: 255 }).notNull(),

    map_id: integer("map_id")
        .references(() => maps.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    map_name: varchar("map_name", { length: 255 }).notNull(),

    time: integer("time").notNull(),

    player_name: varchar("player_name", { length: 255 }).notNull(),

    country_id: integer("country_id")
        .references(() => country.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    country_code: varchar("country_code", { length: 255 }),

    record_date: date("record_date").notNull(),
}, (table) => [
    uniqueIndex("world_records_source_map_unique")
        .on(table.source, table.map_name),

    index("world_records_map_idx")
        .on(table.map_id),

    index("world_records_country_idx")
        .on(table.country_id),
]);
