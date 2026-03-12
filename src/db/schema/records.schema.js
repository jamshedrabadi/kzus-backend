import {
    pgTable,
    pgEnum,
    serial,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";

import { players } from "./players.schema.js";
import { maps } from "./maps.schema.js";
import { RECORD_MODES } from "../../constants/record.constants.js";

export const modeEnum = pgEnum("mode", RECORD_MODES);

export const records = pgTable("records", {
    id:
        serial("id").primaryKey(),
    player_id:
        integer().notNull().references(() => players.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    map_id:
        integer().notNull().references(() => maps.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    time:
        integer().notNull(),
    mode:
        modeEnum().notNull(),
    cp:
        integer().notNull(),
    gc:
        integer().notNull(),
    place:
        integer().notNull(),
    points:
        integer().notNull(),
    created_at:
        timestamp().defaultNow(),
});
