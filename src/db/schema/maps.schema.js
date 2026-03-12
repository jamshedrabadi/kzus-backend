import {
    pgTable,
    pgEnum,
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
    id:
        serial("id").primaryKey(),
    name:
        varchar({ length: 255 }).notNull().unique(),
    difficulty_id:
        integer().notNull().references(() => difficulty.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    length:
        lengthEnum().notNull(),
    type:
        typeEnum().notNull(),
    created_at:
        timestamp().defaultNow(),
});
