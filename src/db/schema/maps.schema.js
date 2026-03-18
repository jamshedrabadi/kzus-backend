import {
    pgTable,
    uniqueIndex,
    index,
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

    created_at: timestamp("created_at").defaultNow().notNull(),

    updated_at: timestamp("updated_at"),
}, (table) => [
    uniqueIndex("maps_name_unique")
        .on(table.name),

    index("maps_difficulty_idx")
        .on(table.difficulty_id),
]);
