import {
    responseError,
    responseNotFoundError,
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
    RESPONSE_CODE_SUCCESS,
} from "../constants/response.constants.js";

export const getLengthList = async (request, response) => {
    try {
        const lengthListResponse = await getLengthListFromDb();
        if (!lengthListResponse.length) {
            return responseNotFoundError(
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
            response,
            [error.message],
        );
    }
};
