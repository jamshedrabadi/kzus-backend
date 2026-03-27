import {
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

export const server = pgTable("server", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    ip: varchar("ip", { length: 15 }).notNull(),

    port: varchar("port", { length: 5 }).notNull(),
});
