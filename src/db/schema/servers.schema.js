import {
    pgTable,
    uniqueIndex,
    serial,
    varchar,
    integer,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";

import { country } from "./country.schema.js";
import { maps } from "./maps.schema.js";

export const servers = pgTable("servers", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    ip: varchar("ip", { length: 15 }).notNull(),

    port: varchar("port", { length: 5 }).notNull(),

    country_id: integer("country_id").notNull()
        .references(() => country.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    max_players: integer("max_players").default(0).notNull(),

    current_players: integer("current_players").default(0).notNull(),

    map_id: integer("map_id")
        .references(() => maps.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    last_seen_at: timestamp("last_seen_at", { withTimezone: true }),

    display_server: boolean("display_server").default(true).notNull(),

    display_order: integer("display_order"),

    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
    uniqueIndex("servers_ip_port_unique")
        .on(table.ip, table.port),
]);
