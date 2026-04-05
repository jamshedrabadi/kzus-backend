import {
    createPlayerInDb,
    updatePlayerInDb,
    getPlayerDataFromDb,
    getPlayerStatsFromDb,
    getPlayerListFromDb,
    checkExistingPlayerSteamId,
} from "../services/player.service.js";
import {
    formatValidationErrorResponse,
    responseError,
    responseSuccess,
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
    VALIDATION_ERROR,
    CONFLICT_ERROR,
    NOT_FOUND_ERROR,
    INTERNAL_SERVER_ERROR,
} from "../constants/response.constants.js";
import {
    PLAYER_CREATION_SUCCESS_MESSAGE,
    PLAYER_UPDATION_SUCCESS_MESSAGE,
    PLAYER_FOUND_MESSAGE,
    PLAYER_NOT_FOUND_MESSAGE,
    PLAYER_LIST_FOUND_MESSAGE,
    PLAYER_LIST_NOT_FOUND_MESSAGE,
    DUPLICATE_PLAYER_STEAMID_MESSAGE,
} from "../constants/player.constants.js";

export const createPlayer = async (request, response) => {
    try {
        const playerData = request.body;

        const validateRequest = createOrUpdatePlayerSchema.validate(playerData);
        if (validateRequest.error) {
            return responseError(
                VALIDATION_ERROR,
                response,
                formatValidationErrorResponse(validateRequest.error),
            );
        }

        const mappedPlayerData = mapCreateOrUpdatePlayerRequest(playerData);

        const existingPlayers = await checkExistingPlayerSteamId(mappedPlayerData);
        if (existingPlayers > 0) {
            return responseError(
                CONFLICT_ERROR,
                response,
                [DUPLICATE_PLAYER_STEAMID_MESSAGE],
            );
        }

        const createPlayerResponse = await createPlayerInDb(mappedPlayerData);

        return responseSuccess(
            response,
            RESPONSE_CODE_CREATED,
            PLAYER_CREATION_SUCCESS_MESSAGE,
            { playerId: createPlayerResponse },
        );
    } catch (error) {
        console.error("Error in createPlayer: ", error);

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
    }
};

export const updatePlayer = async (request, response) => {
    try {
        const playerId = request.params.id;
        const playerData = request.body;

        const validateRequest = createOrUpdatePlayerSchema.validate(playerData);
        if (validateRequest.error) {
            return responseError(
                VALIDATION_ERROR,
                response,
                formatValidationErrorResponse(validateRequest.error),
            );
        }

        const mappedPlayerData = mapCreateOrUpdatePlayerRequest(playerData);

        const existingPlayers = await checkExistingPlayerSteamId(mappedPlayerData, playerId);
        if (existingPlayers > 0) {
            return responseError(
                CONFLICT_ERROR,
                response,
                [DUPLICATE_PLAYER_STEAMID_MESSAGE],
            );
        }

        const updatePlayerResponse = await updatePlayerInDb(playerId, mappedPlayerData);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            PLAYER_UPDATION_SUCCESS_MESSAGE,
            { playerId: updatePlayerResponse },
        );
    } catch (error) {
        console.error("Error in updatePlayer: ", error);

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
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
            return responseError(
                NOT_FOUND_ERROR,
                response,
                [PLAYER_NOT_FOUND_MESSAGE],
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

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
    }
};

export const getPlayerList = async (request, response) => {
    try {
        const playerListResponse = await getPlayerListFromDb();
        if (!playerListResponse.length) {
            return responseError(
                NOT_FOUND_ERROR,
                response,
                [PLAYER_LIST_NOT_FOUND_MESSAGE],
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

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
    }
};
