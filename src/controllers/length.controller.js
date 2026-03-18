import {
    responseSender,
} from "../utils/response.utils.js";
import {
    getLengthListFromDb,
} from "../services/length.service.js";
import {
    mapGetLengthListResponse,
} from "../mappers/length.mapper.js";
import {
    LENGTH_LIST_FOUND_MESSAGE,
    LENGTH_LIST_NOT_FOUND_MESSAGE,
    LENGTH_MODULE,
} from "../constants/length.constants.js";
import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
} from "../constants/common.constants.js";

export const getLengthList = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: LENGTH_MODULE,
    };

    try {
        const lengthListResponse = await getLengthListFromDb();
        if (!lengthListResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = LENGTH_LIST_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedLengthListResponse = mapGetLengthListResponse(lengthListResponse);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = LENGTH_LIST_FOUND_MESSAGE;
        responseData.data = mappedLengthListResponse;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in getLengthList: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
