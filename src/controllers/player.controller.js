import {
    createPlayerInDb,
    updatePlayerInDb,
    getPlayerDataFromDb,
    getPlayerStatsFromDb,
    getPlayerListFromDb,
} from "../services/player.service.js";
import {
    responseError,
    responseNotFoundError,
    responseSuccess,
    responseValidationError,
} from "../utils/response.utils.js";
import {
    createOrUpdatePlayerSchema,
} from "../validators/player.validator.js";
import {
    mapCreateOrUpdatePlayerRequest,
    mapGetPlayerListResponse,
    mapGetPlayerResponse,
} from "../mappers/player.mapper.js";
import {
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_CREATED,
} from "../constants/http.constants.js";
import {
    PLAYER_CREATION_SUCCESS_MESSAGE,
    PLAYER_UPDATION_SUCCESS_MESSAGE,
    PLAYER_FOUND_MESSAGE,
    PLAYER_NOT_FOUND_MESSAGE,
    PLAYER_LIST_FOUND_MESSAGE,
    PLAYER_LIST_NOT_FOUND_MESSAGE,
} from "../constants/player.constants.js";
import {
} from "../constants/common.constants.js";

export const createPlayer = async (request, response) => {
    try {
        const playerData = request.body;

        const validateRequest = createOrUpdatePlayerSchema.validate(playerData);
        if (validateRequest.error) {
            responseValidationError(
                response,
                validateRequest.error,
            );
        }

        const mappedPlayerData = mapCreateOrUpdatePlayerRequest(playerData);

        const createPlayerResponse = await createPlayerInDb(mappedPlayerData);

        return responseSuccess(
            response,
            RESPONSE_CODE_CREATED,
            PLAYER_CREATION_SUCCESS_MESSAGE,
            { playerId: createPlayerResponse },
        );
    } catch (error) {
        console.error("Error in createPlayer: ", error);

        responseError(response, error);
    }
};

export const updatePlayer = async (request, response) => {
    try {
        const playerId = request.params.id;
        const playerData = request.body;

        const validateRequest = createOrUpdatePlayerSchema.validate(playerData);
        if (validateRequest.error) {
            responseValidationError(
                response,
                validateRequest.error,
            );
        }

        const mappedPlayerData = mapCreateOrUpdatePlayerRequest(playerData);

        const updatePlayerResponse = await updatePlayerInDb(playerId, mappedPlayerData);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            PLAYER_UPDATION_SUCCESS_MESSAGE,
            { playerId: updatePlayerResponse },
        );
    } catch (error) {
        console.error("Error in updatePlayer: ", error);

        responseError(response, error);
    }
};

export const getPlayerData = async (request, response) => {
    try {
        const playerId = request.params.id;

        const [playerResponse, playerStatsResponse] = await Promise.all([
            getPlayerDataFromDb(playerId),
            getPlayerStatsFromDb(playerId),
        ]);
        if (!playerResponse.length) {
            responseNotFoundError(
                response,
                PLAYER_NOT_FOUND_MESSAGE,
            );
        }

        const mappedPlayerResponse = mapGetPlayerResponse(playerResponse, playerStatsResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            PLAYER_FOUND_MESSAGE,
            mappedPlayerResponse,
        );
    } catch (error) {
        console.error("Error in getPlayerData: ", error);

        responseError(response, error);
    }
};

export const getPlayerList = async (request, response) => {
    try {
        const playerListResponse = await getPlayerListFromDb();
        if (!playerListResponse.length) {
            responseNotFoundError(
                response,
                PLAYER_LIST_NOT_FOUND_MESSAGE,
            );
        }

        const mappedPlayerListResponse = mapGetPlayerListResponse(playerListResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            PLAYER_LIST_FOUND_MESSAGE,
            mappedPlayerListResponse,
        );
    } catch (error) {
        console.error("Error in getPlayerList: ", error);

        responseError(response, error);
    }
};
