import {
    responseSender,
} from "../utils/response.utils.js";
import {
    getServerListFromDb,
} from "../services/server.service.js";
import {
    mapGetServerListResponse,
} from "../mappers/server.mapper.js";
import {
    SERVER_MODULE,
    SERVER_LIST_FOUND_MESSAGE,
    SERVER_LIST_NOT_FOUND_MESSAGE,
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
