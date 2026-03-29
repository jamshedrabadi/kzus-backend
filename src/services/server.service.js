import { asc } from "drizzle-orm";

import { db } from "../db/db-connection.js";
import { servers } from "../db/schema/servers.schema.js";

export const getServerListFromDb = async () => {
    try {
        const result = await db
            .select({
                server_id: servers.id,
                server_name: servers.name,
                server_ip: servers.ip,
                server_port: servers.port,
                server_country: servers.country_id,
                server_max_players: servers.max_players,
                server_current_players: servers.current_players,
                server_current_map: servers.map_id,
                server_last_seen: servers.last_seen,
                server_display_server: servers.display_server,
                server_display_order: servers.display_order,
            })
            .from(servers)
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
