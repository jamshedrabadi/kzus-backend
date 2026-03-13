import {
    createMapInDb,
} from "../services/map.service.js";
import {
    responseSender,
} from "../utils/response.utils.js";
import {
    createMapSchema,
} from "../validators/map.validator.js";
import {
    mapCreateMapRequest,
} from "../mappers/map.mapper.js";
import {
    RESPONSE_CODE_CREATED,
} from "../constants/http.constants.js";
import {
    MAP_MODULE,
    MAP_CREATION_SUCCESS_MESSAGE,
} from "../constants/map.constants.js";

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
