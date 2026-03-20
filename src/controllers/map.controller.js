import {
    createMapInDb,
    updateMapInDb,
    getMapDataFromDb,
    getMapStatsFromDb,
    getMapListFromDb,
} from "../services/map.service.js";
import {
    responseSender,
} from "../utils/response.utils.js";
import {
    createOrUpdateMapSchema,
} from "../validators/map.validator.js";
import {
    mapCreateOrUpdateMapRequest,
    mapGetMapResponse,
    mapGetMapListResponse,
} from "../mappers/map.mapper.js";
import {
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_CREATED,
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
} from "../constants/http.constants.js";
import {
    MAP_MODULE,
    MAP_CREATION_SUCCESS_MESSAGE,
    MAP_UPDATION_SUCCESS_MESSAGE,
    MAP_FOUND_MESSAGE,
    MAP_NOT_FOUND_MESSAGE,
    MAP_LIST_FOUND_MESSAGE,
    MAP_LIST_NOT_FOUND_MESSAGE,
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

        await createOrUpdateMapSchema.validateAsync(mapData);

        const mappedMapData = mapCreateOrUpdateMapRequest(mapData);

        const createMapResponse = await createMapInDb(mappedMapData);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_CREATED;
        responseData.message = MAP_CREATION_SUCCESS_MESSAGE;
        responseData.data = { mapId: createMapResponse };

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

export const updateMap = async (request, response) => {
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
        const mapData = request.body;

        await createOrUpdateMapSchema.validateAsync(mapData);

        const mappedMapData = mapCreateOrUpdateMapRequest(mapData);

        const updateMapResponse = await updateMapInDb(mapId, mappedMapData);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = MAP_UPDATION_SUCCESS_MESSAGE;
        responseData.data = { mapId: updateMapResponse };

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in updateMap: ", error);

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

        const [mapResponse, mapStatsResponse] = await Promise.all([
            getMapDataFromDb(mapId),
            getMapStatsFromDb(mapId),
        ]);
        if (!mapResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = MAP_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedMapResponse = mapGetMapResponse(mapResponse, mapStatsResponse);

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

export const getMapList = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: MAP_MODULE,
    };

    try {
        const mapListResponse = await getMapListFromDb();
        if (!mapListResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = MAP_LIST_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedMapListResponse = mapGetMapListResponse(mapListResponse);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = MAP_LIST_FOUND_MESSAGE;
        responseData.data = mappedMapListResponse;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);

    } catch (error) {
        console.error("Error in getMapList: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;
        responseData.error = error;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
