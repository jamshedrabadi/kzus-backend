import {
    responseSender,
} from "../utils/response.utils.js";
import {
    getTypeListFromDb,
} from "../services/type.service.js";
import {
    mapGetTypeListResponse,
} from "../mappers/type.mapper.js";
import {
    TYPE_LIST_FOUND_MESSAGE,
    TYPE_LIST_NOT_FOUND_MESSAGE,
    TYPE_MODULE,
} from "../constants/type.constants.js";
import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
} from "../constants/common.constants.js";

export const getTypeList = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: TYPE_MODULE,
    };

    try {
        const typeListResponse = await getTypeListFromDb();
        if (!typeListResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = TYPE_LIST_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedTypeListResponse = mapGetTypeListResponse(typeListResponse);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = TYPE_LIST_FOUND_MESSAGE;
        responseData.data = mappedTypeListResponse;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in getTypeList: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
