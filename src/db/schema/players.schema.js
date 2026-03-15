import {
    pgTable,
    uniqueIndex,
    serial,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";

export const players = pgTable("players", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    country: varchar("country", { length: 3 }).notNull(),

    steam_id: varchar("steam_id", { length: 17 }).notNull(),

    created_at: timestamp("created_at").defaultNow().notNull(),

    updated_at: timestamp("updated_at"),
}, (table) => [
    uniqueIndex("players_steam_id_unique")
        .on(table.steam_id),
]);
