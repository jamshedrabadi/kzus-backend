/* eslint-disable no-console */
/* eslint-disable @stylistic/max-len */

import "dotenv/config";
import { sql } from 'drizzle-orm';

import { db } from "../db-connection.js";
import { difficulty } from "../schema/difficulty.schema.js";
import { players } from "../schema/players.schema.js";
import { maps } from "../schema/maps.schema.js";
import { records } from "../schema/records.schema.js";

export const seedDev = async () => {
    await db.execute(sql`DELETE FROM difficulty;`);
    await db.execute(sql`ALTER SEQUENCE difficulty_id_seq RESTART WITH 1;`);
    await db.execute(sql`DELETE FROM players;`);
    await db.execute(sql`ALTER SEQUENCE players_id_seq RESTART WITH 1;`);
    await db.execute(sql`DELETE FROM maps;`);
    await db.execute(sql`ALTER SEQUENCE maps_id_seq RESTART WITH 1;`);
    await db.execute(sql`DELETE FROM records;`);
    await db.execute(sql`ALTER SEQUENCE records_id_seq RESTART WITH 1;`);
    console.log("Dev data cleared");

    await db.insert(difficulty).values([
        { name: "beginner", order_index: 1, multiplier: "0.25" },
        { name: "easy", order_index: 2, multiplier: "0.35" },
        { name: "easy-medium", order_index: 3, multiplier: "0.50" },
        { name: "medium", order_index: 4, multiplier: "0.70" },
        { name: "medium-hard", order_index: 5, multiplier: "1.00" },
        { name: "hard", order_index: 6, multiplier: "1.50" },
        { name: "hard-extreme", order_index: 7, multiplier: "2.20" },
        { name: "extreme", order_index: 8, multiplier: "3.20" },
        { name: "extreme-death", order_index: 9, multiplier: "4.50" },
        { name: "death", order_index: 10, multiplier: "6.00" },
    ]);
    await db.insert(players).values([
        { name: "jam1", country: "USA", steam_id: "11111111111111111" },
        { name: "jam2", country: "LTU", steam_id: "22222222222222222" },
        { name: "jam3", country: "EST", steam_id: "33333333333333333" },
        { name: "jam4", country: "EST", steam_id: "44444444444444444" },
        { name: "jam5", country: "BRA", steam_id: "55555555555555555" },
    ]);
    await db.insert(maps).values([
        { name: "map1", difficulty_id: "1", length: "short", type: "climb" },
        { name: "map2", difficulty_id: "3", length: "long", type: "bhop" },
        { name: "map3", difficulty_id: "5", length: "very-short", type: "mix" },
        { name: "map4", difficulty_id: "7", length: "very-long", type: "slide" },
        { name: "map5", difficulty_id: "10", length: "middle", type: "special" },
    ]);
    await db.insert(records).values([
        { player_id: "1", map_id: "1", time: "6000", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "1", map_id: "2", time: "7000", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "2", map_id: "1", time: "6000", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "2", map_id: "2", time: "7000", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "2", map_id: "3", time: "6500", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "2", map_id: "5", time: "8500", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "3", map_id: "5", time: "5000", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "4", map_id: "1", time: "100", mode: "nub", cp: 5, gc: 55, place: 0, points: 0 },
        { player_id: "5", map_id: "1", time: "10000", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "5", map_id: "5", time: "11000", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
        { player_id: "5", map_id: "4", time: "4000", mode: "nub", cp: 6, gc: 66, place: 0, points: 0 },
        { player_id: "3", map_id: "4", time: "4000", mode: "pro", cp: 0, gc: 0, place: 0, points: 0 },
    ]);
    console.log("Dev data seeded");
};

await seedDev();

process.exit(0);
