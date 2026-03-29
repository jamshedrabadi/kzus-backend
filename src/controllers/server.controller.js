import {
    responseSender,
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
    SERVER_MODULE,
    SERVER_LIST_FOUND_MESSAGE,
    SERVER_LIST_NOT_FOUND_MESSAGE,
    SERVER_PLAYER_COUNT_UPDATION_SUCCESS_MESSAGE,
    SERVER_PLAYER_COUNT_UPDATION_FAILURE_MESSAGE,
    SERVER_MAP_NAME_UPDATION_SUCCESS_MESSAGE,
    SERVER_MAP_NAME_UPDATION_FAILURE_MESSAGE,
    SERVER_HEARTBEAT_UPDATION_SUCCESS_MESSAGE,
    SERVER_HEARTBEAT_UPDATION_FAILURE_MESSAGE,
} from "../constants/server.constants.js";
import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
} from "../constants/common.constants.js";

export const getServerList = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: SERVER_MODULE,
    };

    try {
        const serverListResponse = await getServerListFromDb();
        if (!serverListResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = SERVER_LIST_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedServerListResponse = mapGetServerListResponse(serverListResponse);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = SERVER_LIST_FOUND_MESSAGE;
        responseData.data = mappedServerListResponse;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in getServerList: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};

export const updatePlayerCount = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: SERVER_MODULE,
    };

    try {
        const serverId = request.params.id;
        const serverData = request.body;

        await updatePlayerCountSchema.validateAsync(serverData);

        const mappedServerData = mapUpdatePlayerCountRequest(serverData);

        const updateServerResponse = await updatePlayerCountInDb(serverId, mappedServerData);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = SERVER_PLAYER_COUNT_UPDATION_SUCCESS_MESSAGE;
        responseData.data = { serverId: updateServerResponse };

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in updatePlayerCount: ", error);

        responseData.error = error;
        responseData.module = SERVER_MODULE;
        responseData.message = SERVER_PLAYER_COUNT_UPDATION_FAILURE_MESSAGE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};

export const updateMapName = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: SERVER_MODULE,
    };

    try {
        const serverId = request.params.id;
        const serverData = request.body;

        await updateMapNameSchema.validateAsync(serverData);

        const mappedServerData = mapUpdateMapNameRequest(serverData);

        const updateServerResponse = await updateMapNameInDb(serverId, mappedServerData);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = SERVER_MAP_NAME_UPDATION_SUCCESS_MESSAGE;
        responseData.data = { serverId: updateServerResponse };

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in updateMapName: ", error);

        responseData.error = error;
        responseData.module = SERVER_MODULE;
        responseData.message = SERVER_MAP_NAME_UPDATION_FAILURE_MESSAGE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};

export const updateHeartbeat = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: SERVER_MODULE,
    };

    try {
        const serverId = request.params.id;

        const updateServerResponse = await updateHeartbeatInDb(serverId);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = SERVER_HEARTBEAT_UPDATION_SUCCESS_MESSAGE;
        responseData.data = { serverId: updateServerResponse };

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in updateHeartbeat: ", error);

        responseData.error = error;
        responseData.module = SERVER_MODULE;
        responseData.message = SERVER_HEARTBEAT_UPDATION_FAILURE_MESSAGE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
