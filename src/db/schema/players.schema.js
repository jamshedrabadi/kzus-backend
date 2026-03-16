import {
    pgTable,
    uniqueIndex,
    index,
    serial,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";

import { country } from "./country.schema.js";

export const players = pgTable("players", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    country_id: integer("country_id").notNull()
        .references(() => country.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    steam_id: varchar("steam_id", { length: 17 }).notNull(),

    created_at: timestamp("created_at").defaultNow().notNull(),

    updated_at: timestamp("updated_at"),
}, (table) => [
    uniqueIndex("players_steam_id_unique")
        .on(table.steam_id),

    index("players_country_idx")
        .on(table.country_id),
]);
