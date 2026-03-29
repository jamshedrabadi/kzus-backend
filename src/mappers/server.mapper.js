export const mapGetServerListResponse = (serverData) => {
    const mappedPlayerData = serverData.map((server) => {
        return {
            serverId: server.server_id,
            serverName: server.server_name,
            serverIp: server.server_ip,
            serverPort: server.server_port,
            serverCountry: server.server_country,
            serverMaxPlayers: server.server_max_players,
            serverCurrentPlayers: server.server_current_players,
            serverCurrentMap: server.server_current_map,
            serverLastSeen: server.server_last_seen,
            serverDisplayServer: server.server_display_server,
            serverDisplayOrder: server.server_display_ordeer,
        };
    });

    return mappedPlayerData;
};
