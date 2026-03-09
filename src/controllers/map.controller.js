import { storeMap } from "../services/map.service.js";
import { responseSender } from "../utils/response.utils.js";
import {
    RESPONSE_CODE_CREATED,
} from "../constants/http.constants.js";
import {
    MAP_MODULE,
    MAP_CREATION_SUCCESS_MESSAGE,
} from "../constants/map.constants.js";

export const createMap = async (request, response) => {
    const responseData = { status: false, statusCode: 0, message: "", error: null, module: "" };

    try {
        const mapData = request.body;

        // validation here

        await storeMap(mapData);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_CREATED;
        responseData.message = MAP_CREATION_SUCCESS_MESSAGE;
    } catch (error) {
        console.error("Error in createMap: ", error);

        responseData.error = error;
        responseData.module = MAP_MODULE;
    }

    return responseSender(response, responseData.status, responseData.statusCode,
        responseData.message, responseData.error, responseData.module);
}
