import {
    createPlayerInDb,
    getPlayerDataFromDb,
} from "../services/player.service.js";
import { responseSender } from "../utils/response.utils.js";
import {
    RESPONSE_CODE_CREATED,
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    PLAYER_MODULE,
    PLAYER_CREATION_SUCCESS_MESSAGE,
    PLAYER_FOUND_MESSAGE,
    PLAYER_NOT_FOUND_MESSAGE,
} from "../constants/player.constants.js";
import { createPlayerSchema } from "../validators/player.validator.js";
import { RESPONSE_MESSAGE_DATA_NOT_FOUND } from "../constants/common.constants.js";

export const createPlayer = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: PLAYER_MODULE,
    };

    try {
        const playerData = request.body;

        await createPlayerSchema.validateAsync(playerData);

        await createPlayerInDb(playerData);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_CREATED;
        responseData.message = PLAYER_CREATION_SUCCESS_MESSAGE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in createPlayer: ", error);

        responseData.error = error;
        responseData.module = PLAYER_MODULE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};

export const getPlayerData = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: PLAYER_MODULE,
    };

    try {
        const playerId = request.params.id;

        const playerResponse = await getPlayerDataFromDb(playerId);
        if (!playerResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const playerData = {
            name: playerResponse[0].player_name,
            country: playerResponse[0].player_country,
            steam_id: playerResponse[0].player_steam_id,
            records: [],
        };
        if (playerResponse[0].map_name) {
            playerData.records = playerResponse.map(record => ({
                map_name: record.map_name,
                difficulty_order_index: record.difficulty_order_index,
                difficulty_id: record.difficulty_id,
                record_time: record.record_time,
                record_place: record.record_place,
                record_points: record.record_points,
                record_created_at: record.record_created_at,
                record_mode: record.record_mode,
                record_cp: record.record_cp,
                record_gc: record.record_gc,
            }));
        }

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = PLAYER_FOUND_MESSAGE;
        responseData.data = playerData;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in getPlayerData: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = PLAYER_NOT_FOUND_MESSAGE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
