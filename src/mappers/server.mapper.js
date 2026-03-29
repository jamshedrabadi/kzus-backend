import {
    COUNTRY_FLAG_URL,
    COUNTRY_FLAG_EXTENSION,
} from "../constants/country.constants.js";

export const mapGetServerListResponse = (serverData) => {
    const mappedPlayerData = serverData.map((server) => {
        return {
            serverId: server.server_id,
            serverName: server.server_name,
            serverIp: server.server_ip,
            serverPort: server.server_port,
            serverCountryId: server.server_country_id,
            serverCountryName: server.server_country_name,
            serverCountryCode: server.server_country_code,
            serverCountryFlag: `${COUNTRY_FLAG_URL}${server.server_country_code}${COUNTRY_FLAG_EXTENSION}`,
            serverMaxPlayers: server.server_max_players,
            serverCurrentPlayers: server.server_current_players,
            serverMapId: server.server_map_id,
            serverMapName: server.server_map_name,
            serverLastSeen: server.server_last_seen,
            serverDisplayServer: server.server_display_server,
            serverDisplayOrder: server.server_display_ordeer,
        };
    });

    return mappedPlayerData;
};

export const mapUpdatePlayerCountRequest = (serverData) => {
    const mappedServerData = {
        current_players: serverData.currentPlayers,
    };

    return mappedServerData;
};

export const mapUpdateMapNameRequest = (serverData) => {
    const mappedServerData = {
        map_name: serverData.mapName,
    };

    return mappedServerData;
};
