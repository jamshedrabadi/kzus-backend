import {
    responseError,
    responseNotFoundError,
    responseSuccess,
    responseValidationError,
} from "../utils/response.utils.js";
import {
    getServerListFromDb,
    updatePlayerCountInDb,
    updateMapNameInDb,
    updateHeartbeatInDb,
} from "../services/server.service.js";
import {
    mapGetServerListResponse,
    mapUpdatePlayerCountRequest,
    mapUpdateMapNameRequest,
} from "../mappers/server.mapper.js";
import {
    updatePlayerCountSchema,
    updateMapNameSchema,
} from "../validators/server.validator.js";
import {
    SERVER_LIST_FOUND_MESSAGE,
    SERVER_LIST_NOT_FOUND_MESSAGE,
    SERVER_PLAYER_COUNT_UPDATION_SUCCESS_MESSAGE,
    SERVER_MAP_NAME_UPDATION_SUCCESS_MESSAGE,
    SERVER_HEARTBEAT_UPDATION_SUCCESS_MESSAGE,
} from "../constants/server.constants.js";
import {
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";

export const getServerList = async (request, response) => {
    try {
        const serverListResponse = await getServerListFromDb();
        if (!serverListResponse.length) {
            return responseNotFoundError(
                response,
                SERVER_LIST_NOT_FOUND_MESSAGE,
            );
        }

        const mappedServerListResponse = mapGetServerListResponse(serverListResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            SERVER_LIST_FOUND_MESSAGE,
            mappedServerListResponse,
        );
    } catch (error) {
        console.error("Error in getServerList: ", error);

        return responseError(response, error);
    }
};

export const updatePlayerCount = async (request, response) => {
    try {
        const serverId = request.params.id;
        const serverData = request.body;

        const validateRequest = updatePlayerCountSchema.validate(serverData);
        if (validateRequest.error) {
            return responseValidationError(
                response,
                validateRequest.error,
            );
        }

        const mappedServerData = mapUpdatePlayerCountRequest(serverData);

        await updatePlayerCountInDb(serverId, mappedServerData);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            SERVER_PLAYER_COUNT_UPDATION_SUCCESS_MESSAGE,
        );
    } catch (error) {
        console.error("Error in updatePlayerCount: ", error);

        return responseError(response, error);
    }
};

export const updateMapName = async (request, response) => {
    try {
        const serverId = request.params.id;
        const serverData = request.body;

        const validateRequest = updateMapNameSchema.validate(serverData);
        if (validateRequest.error) {
            return responseValidationError(
                response,
                validateRequest.error,
            );
        }

        const mappedServerData = mapUpdateMapNameRequest(serverData);

        await updateMapNameInDb(serverId, mappedServerData);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            SERVER_MAP_NAME_UPDATION_SUCCESS_MESSAGE,
        );
    } catch (error) {
        console.error("Error in updateMapName: ", error);

        return responseError(response, error);
    }
};

export const updateHeartbeat = async (request, response) => {
    try {
        const serverId = request.params.id;

        await updateHeartbeatInDb(serverId);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            SERVER_HEARTBEAT_UPDATION_SUCCESS_MESSAGE,
        );
    } catch (error) {
        console.error("Error in updateHeartbeat: ", error);

        return responseError(response, error);
    }
};
