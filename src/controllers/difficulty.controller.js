import {
    responseSender,
} from "../utils/response.utils.js";
import {
    getDifficultyListFromDb,
} from "../services/difficulty.service.js";
import {
    mapGetDifficultyListResponse,
} from "../mappers/difficulty.mapper.js";
import {
    DIFFICULTY_LIST_FOUND_MESSAGE,
    DIFFICULTY_LIST_NOT_FOUND_MESSAGE,
    DIFFICULTY_MODULE,
} from "../constants/difficulty.constants.js";
import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
} from "../constants/common.constants.js";

export const getDifficultyList = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: DIFFICULTY_MODULE,
    };

    try {
        const difficultyListResponse = await getDifficultyListFromDb();
        if (!difficultyListResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = DIFFICULTY_LIST_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedDifficultyListResponse = mapGetDifficultyListResponse(difficultyListResponse);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = DIFFICULTY_LIST_FOUND_MESSAGE;
        responseData.data = mappedDifficultyListResponse;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in getDifficultyList: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
