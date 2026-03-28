import {
    pgTable,
    uniqueIndex,
    serial,
    varchar,
    integer,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";

export const server = pgTable("server", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    ip: varchar("ip", { length: 15 }).notNull(),

    port: varchar("port", { length: 5 }).notNull(),

    country: varchar("country", { length: 255 }).notNull(),

    current_map: varchar("current_map", { length: 100 }).notNull(),

    current_players: integer("current_players").default(0).notNull(),

    max_players: integer("max_players").default(0).notNull(),

    is_active: boolean("is_active").default(true).notNull(),

    last_seen: timestamp("last_seen_at", { withTimezone: true }),

    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
    uniqueIndex("server_ip_port_unique")
        .on(table.ip, table.port),
]);
