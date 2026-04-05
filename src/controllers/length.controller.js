import {
    responseError,
    responseSuccess,
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
} from "../constants/length.constants.js";
import {
    INTERNAL_SERVER_ERROR,
    NOT_FOUND_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/response.constants.js";

export const getLengthList = async (request, response) => {
    try {
        const lengthListResponse = await getLengthListFromDb();
        if (!lengthListResponse.length) {
            return responseError(
                NOT_FOUND_ERROR,
                response,
                [LENGTH_LIST_NOT_FOUND_MESSAGE],
            );
        }

        const mappedLengthListResponse = mapGetLengthListResponse(lengthListResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            LENGTH_LIST_FOUND_MESSAGE,
            mappedLengthListResponse,
        );
    } catch (error) {
        console.error("Error in getLengthList: ", error);

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
    }
};
