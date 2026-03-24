import { sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import {
    parseApiTextResponse,
} from "../mappers/world_record.mapper.js";
import {
    KREEDZCOM_API_URL,
    COSYCLIMBING_API_URL,
    API_NAME_KZCOM,
    API_NAME_COSY,
} from "../constants/world_record.constants.js";

export const fetchWorldRecordApisData = async () => {
    try {
        const [
            kzcomApiTextResponse,
            cosyApiTextResponse,
        ] = await Promise.all([
            await getApiTextResponse(KREEDZCOM_API_URL),
            await getApiTextResponse(COSYCLIMBING_API_URL),
        ]);

        const kzcomWorldRecordList = parseApiTextResponse(kzcomApiTextResponse, API_NAME_KZCOM);
        const cosyWorldRecordList = parseApiTextResponse(cosyApiTextResponse, API_NAME_COSY);

        return [...kzcomWorldRecordList, ...cosyWorldRecordList];
    } catch (error) {
        console.error("Error in fetchWorldRecordApisData: ", error);
    }
};

export const getApiTextResponse = async (url) => {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        console.error("Error in getApiTextResponse: ", error);
    }
};

export const insertWorldRecordData = async (worldRecordData) => {
    try {
        const values = sql.join(
            worldRecordData.map((wr) => sql`(
                ${wr.source}::text,
                ${wr.map_name}::text,
                ${wr.time}::int,
                ${wr.player_name}::text,
                ${wr.country_code}::text,
                ${wr.record_date}::date
            )`),
            sql`, `,
        );

        await db.execute(sql`
            INSERT INTO world_records (
                source,
                map_id,
                map_name,
                time,
                player_name,
                country_id,
                country_code,
                record_date
            )
            SELECT
                val.source AS source,
                maps.id AS map_id,
                val.map_name AS map_name,
                val.time AS time,
                val.player_name AS player_name,
                country.id AS country_id,
                val.country_code AS country_code,
                val.record_date AS record_date
            FROM (
                VALUES ${values}
            ) AS val (
                source,
                map_name,
                time,
                player_name,
                country_code,
                record_date
            )
            LEFT JOIN maps ON maps.name = val.map_name
            LEFT JOIN country ON country.code = val.country_code
        `);
    } catch (error) {
        console.error("Error in insertWorldRecordData: ", error);
    }
};
