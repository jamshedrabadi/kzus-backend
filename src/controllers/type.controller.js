import {
    responseError,
    responseNotFoundError,
    responseSuccess,
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
} from "../constants/type.constants.js";
import {
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";

export const getTypeList = async (request, response) => {
    try {
        const typeListResponse = await getTypeListFromDb();
        if (!typeListResponse.length) {
            return responseNotFoundError(
                response,
                [TYPE_LIST_NOT_FOUND_MESSAGE],
            );
        }

        const mappedTypeListResponse = mapGetTypeListResponse(typeListResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            TYPE_LIST_FOUND_MESSAGE,
            mappedTypeListResponse,
        );
    } catch (error) {
        console.error("Error in getTypeList: ", error);

        return responseError(
            response,
            [error.message],
        );
    }
};
