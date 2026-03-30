import {
    pgTable,
    index,
    serial,
    text,
    integer,
} from "drizzle-orm/pg-core";

import { maps } from "./maps.schema.js";

export const mapImages = pgTable("map_images", {
    id: serial("id").primaryKey(),

    map_id: integer("map_id").notNull()
        .references(() => maps.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    image_url: text("image_url").notNull(),

    display_order: integer("display_order"),
}, (table) => [
    index("map_images_map_id_idx")
        .on(table.map_id),
]);
