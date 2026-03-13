import {
    createMapInDb,
    getMapDataFromDb,
} from "../services/map.service.js";
import {
    responseSender,
} from "../utils/response.utils.js";
import {
    createMapSchema,
} from "../validators/map.validator.js";
import {
    mapCreateMapRequest,
    mapGetMapResponse,
} from "../mappers/map.mapper.js";
import {
    RESPONSE_CODE_CREATED,
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    MAP_MODULE,
    MAP_CREATION_SUCCESS_MESSAGE,
    MAP_FOUND_MESSAGE,
    MAP_NOT_FOUND_MESSAGE,
} from "../constants/map.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
} from "../constants/common.constants.js";

export const createMap = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: MAP_MODULE,
    };

    try {
        const mapData = request.body;

        await createMapSchema.validateAsync(mapData);

        const mappedMapData = mapCreateMapRequest(mapData);

        await createMapInDb(mappedMapData);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_CREATED;
        responseData.message = MAP_CREATION_SUCCESS_MESSAGE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in createMap: ", error);

        responseData.error = error;
        responseData.module = MAP_MODULE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};

export const getMapData = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: MAP_MODULE,
    };

    try {
        const mapId = request.params.id;

        const mapResponse = await getMapDataFromDb(mapId);
        if (!mapResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = MAP_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedMapResponse = mapGetMapResponse(mapResponse);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = MAP_FOUND_MESSAGE;
        responseData.data = mappedMapResponse;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in getMapData: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};