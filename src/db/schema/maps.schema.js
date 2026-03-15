import {
    pgTable,
    pgEnum,
    index,
    serial,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";

import { difficulty } from "./difficulty.schema.js";
import {
    MAP_LENGTHS,
    MAP_TYPES,
} from "../../constants/map.constants.js";

export const lengthEnum = pgEnum("length", MAP_LENGTHS);
export const typeEnum = pgEnum("type", MAP_TYPES);

export const maps = pgTable("maps", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    difficulty_id: integer("difficulty_id").notNull()
        .references(() => difficulty.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    length: lengthEnum("length").notNull(),

    type: typeEnum("type").notNull(),

    created_at: timestamp("created_at").defaultNow().notNull(),

    updated_at: timestamp("updated_at"),
}, (table) => [
    index("maps_difficulty_idx")
        .on(table.difficulty_id),
]);
