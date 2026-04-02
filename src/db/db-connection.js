/* eslint-disable no-console */

import "dotenv/config";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import {
    DB_POOL_APPLICATION_NAME,
} from "../constants/database.constants.js";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: process.env.DATABASE_POOL_MAX, // keep around 10-20
    idleTimeoutMillis: process.env.DATABASE_IDLE_TIMEOUT, // close connection after 30s idle
    connectionTimeoutMillis: process.env.DATABASE_CONNECTION_TIMEOUT, // timeout after 5s
    application_name: DB_POOL_APPLICATION_NAME, // helps debugging
});

export const dbConnection = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("PostgreSQL DB connected.");
    } catch (error) {
        console.error("Error connecting to PostgreSQL DB: ", error);
        process.exit(1);
    }
};

export const db = drizzle(pool);

export { pool };

process.on("SIGINT", async () => {
    console.log("PostgreSQL DB pool shutting down...");
    await pool.end();
    process.exit(0);
});
