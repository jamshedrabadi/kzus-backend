import { asc, eq, sql } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { servers } from "../db/schema/servers.schema.js";
import { country } from "../db/schema/country.schema.js";
import { maps } from "../db/schema/maps.schema.js";

export const getServerListFromDb = async () => {
    try {
        const result = await db
            .select({
                server_id: servers.id,
                server_name: servers.name,
                server_ip: servers.ip,
                server_port: servers.port,
                server_country_id: servers.country_id,
                server_country_name: country.name,
                server_country_code: country.code,
                server_max_players: servers.max_players,
                server_current_players: servers.current_players,
                server_map_id: servers.map_id,
                server_map_name: maps.name,
                server_last_seen: servers.last_seen,
                server_display_server: servers.display_server,
                server_display_order: servers.display_order,
            })
            .from(servers)
            .innerJoin(country,
                eq(country.id, servers.country_id),
            )
            .innerJoin(maps,
                eq(maps.id, servers.map_id),
            )
            .orderBy(
                asc(servers.display_order),
                asc(servers.id),
            );

        return result;
    } catch (error) {
        console.error("Error in getServerListFromDb: ", error);
        throw error;
    }
};

export const updatePlayerCountInDb = async (serverId, serverData) => {
    try {
        const serverResponse = await db
            .update(servers)
            .set({
                current_players: serverData.current_players,
                last_seen_at: sql`NOW()`,
            })
            .where(
                eq(servers.id, serverId),
            )
            .returning();

        return serverResponse[0].id;
    } catch (error) {
        console.error("Error in updatePlayerCountInDb: ", error);
        throw error;
    }
};

export const updateMapNameInDb = async (serverId, serverData) => {
    try {
        const serverResponse = await db
            .update(servers)
            .set({
                map_id: db
                    .select({ id: maps.id })
                    .from(maps)
                    .where(
                        eq(maps.name, serverData.map_name),
                    )
                    .limit(1),
                last_seen_at: sql`NOW()`,
            })
            .where(
                eq(servers.id, serverId),
            )
            .returning();

        return serverResponse[0].id;
    } catch (error) {
        console.error("Error in updateMapNameInDb: ", error);
        throw error;
    }
};
