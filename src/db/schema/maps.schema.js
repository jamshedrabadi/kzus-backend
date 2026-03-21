import {
    pgTable,
    uniqueIndex,
    serial,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";

import { difficulty } from "./difficulty.schema.js";
import { length } from "./length.schema.js";
import { type } from "./type.schema.js";

export const maps = pgTable("maps", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    difficulty_id: integer("difficulty_id").notNull()
        .references(() => difficulty.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    length_id: integer("length_id").notNull()
        .references(() => length.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    type_id: integer("type_id").notNull()
        .references(() => type.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),

    updated_at: timestamp("updated_at", { withTimezone: true }),
}, (table) => [
    uniqueIndex("maps_name_unique")
        .on(table.name),
]);
