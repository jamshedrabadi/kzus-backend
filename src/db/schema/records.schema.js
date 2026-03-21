import {
    pgTable,
    pgEnum,
    uniqueIndex,
    index,
    serial,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";

import { players } from "./players.schema.js";
import { maps } from "./maps.schema.js";
import { RECORD_MODES } from "../../constants/record.constants.js";

export const modeEnum = pgEnum("mode", RECORD_MODES);

export const records = pgTable("records", {
    id: serial("id").primaryKey(),

    player_id: integer("player_id").notNull()
        .references(() => players.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    map_id: integer("map_id").notNull()
        .references(() => maps.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    time: integer("time").notNull(),

    place: integer("place").notNull(),

    points: integer("points").notNull().default(0),

    mode: modeEnum("mode").notNull(),

    cp: integer("cp").notNull(),

    gc: integer("gc").notNull(),

    improvements: integer("improvements").notNull().default(0),

    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),

    updated_at: timestamp("updated_at", { withTimezone: true }),
}, (table) => [
    uniqueIndex("records_player_map_mode_unique")
        .on(table.player_id, table.map_id, table.mode),

    index("records_player_mode_idx")
        .on(table.player_id, table.mode),

    index("records_map_mode_idx")
        .on(table.map_id, table.mode),

    index("records_map_mode_time_idx")
        .on(table.map_id, table.mode, table.time),

    index("records_map_mode_place_idx")
        .on(table.map_id, table.mode, table.place),
]);
