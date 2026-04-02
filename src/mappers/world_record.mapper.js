import {
    convertSecondsToMs,
} from "../utils/common.utils.js";
import {
    API_NAME_KZCOM,
} from "../constants/world_record.constants.js";

export const parseApiTextResponse = (textResponse, apiName) => {
    const result = [];
    const lines = textResponse.split("\n").slice(1); // skip header

    for (const line of lines) {
        if (!line.trim()) { // if empty line, go next
            continue;
        }

        const parts = apiName === API_NAME_KZCOM
            ? parseKzcomRecordLine(line) : parseCosyRecordLine(line);
        const [map, time, player, country, date] = parts;

        if (Number(time)) { // if time is 0, then no wr on map
            const routeData = parseMapAndRoute(map);

            result.push({
                source: apiName,
                map_name: map,
                base_map_name: routeData.baseMapName,
                map_route: routeData.mapRoute,
                time: convertSecondsToMs(time),
                player_name: player,
                country_code: country !== "n-a" ? country : null,
                record_date: apiName === API_NAME_KZCOM
                    ? convertFromKzcomDate(date) : convertFromCosyDate(date),
            });
        }
    }

    return result;
};

export const parseKzcomRecordLine = (recordLine) => {
    const parts = recordLine.trim().split(/\s+/);

    const map = parts[0];
    const time = parts[1];

    const date = parts[parts.length - 1];
    const country = parts[parts.length - 2];

    const player = parts.slice(2, parts.length - 2).join(" "); // in case player name has spaces

    return [map, time, player, country, date];
};

export const parseCosyRecordLine = (recordLine) => {
    const parts = recordLine.trim().split(/\s+/);

    const map = parts[0];
    const time = parts[1];
    const date = parts[3];
    const country = parts[5];

    const player = parts.slice(6, parts.length).join(" "); // in case player name has spaces

    return [map, time, player, country, date];
};

export const convertFromKzcomDate = (date) => { // dd/mm/yyyy to yyyy-mm-dd (ISO)
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
};

export const convertFromCosyDate = (date) => { // unix time to yyyy-mm-dd (ISO)
    return new Date(Math.round(Number(date) * 1000)).toISOString().slice(0, 10);
};

export const parseMapAndRoute = (mapName) => {
    const match = mapName.match(/^(.+?)(\[(.+)\])?$/); // only for maps like "xyz" or "xyz[xyz]"

    const baseMapName = match[1];
    const mapRoute = match[3] || null;

    return { baseMapName, mapRoute };
};
