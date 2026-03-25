import { sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import {
    parseApiTextResponse,
} from "../mappers/world_record.mapper.js";
import {
    storeCronJobInDb,
} from "./cron_job.service.js";
import {
    KREEDZCOM_API_URL,
    COSYCLIMBING_API_URL,
    API_NAME_KZCOM,
    API_NAME_COSY,
    WORLD_RECORD_CRON_JOB,
} from "../constants/world_record.constants.js";
import {
    CRON_JOB_STATUS_SUCCESS,
    CRON_JOB_STATUS_FAILURE,
} from "../constants/cron_job.constants.js";

export const syncWorldRecords = async (cronJobFlag = false) => {
    const cronJobData = {
        job_name: WORLD_RECORD_CRON_JOB,
        status: CRON_JOB_STATUS_FAILURE,
        started_at: new Date(),
    };

    try {
        const worldRecordData = await fetchWorldRecordApisData();

        if (!worldRecordData?.length) {
            console.error("World Record data not found.");
        }

        await db.transaction(async (tx) => {
            await truncateWorldRecords(tx);
            await insertWorldRecordData(worldRecordData, tx);
        });

        // eslint-disable-next-line no-console
        console.log("World Record data synced.");

        if (cronJobFlag) {
            cronJobData.status = CRON_JOB_STATUS_SUCCESS;
            cronJobData.records_processed = worldRecordData.length;
            cronJobData.finished_at = new Date();

            await storeCronJobInDb(cronJobData);
        }
    } catch (error) {
        console.error("Error in syncWorldRecords: ", error);

        if (cronJobFlag) {
            cronJobData.error_message = error.message;
            cronJobData.finished_at = new Date();

            await storeCronJobInDb(cronJobData);
        }
    }
};

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

export const truncateWorldRecords = async (tx) => {
    try {
        return await tx.execute(sql`TRUNCATE TABLE world_records RESTART IDENTITY CASCADE`);
    } catch (error) {
        console.error("Error in truncateWorldRecords: ", error);
    }
};

export const insertWorldRecordData = async (worldRecordData, tx) => {
    try {
        const values = sql.join(
            worldRecordData.map((wr) => sql`(
                ${wr.source}::text,
                ${wr.map_name}::text,
                ${wr.base_map_name}::text,
                ${wr.map_route}::text,
                ${wr.time}::int,
                ${wr.player_name}::text,
                ${wr.country_code}::text,
                ${wr.record_date}::date
            )`),
            sql`, `,
        );

        await tx.execute(sql`
            INSERT INTO world_records (
                source,
                map_id,
                map_name,
                base_map_name,
                map_route,
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
                val.base_map_name AS base_map_name,
                val.map_route AS map_route,
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
                base_map_name,
                map_route,
                time,
                player_name,
                country_code,
                record_date
            )
            LEFT JOIN maps ON maps.name = val.base_map_name
            LEFT JOIN country ON country.code = val.country_code
        `);
    } catch (error) {
        console.error("Error in insertWorldRecordData: ", error);
    }
};
