import {
    responseError,
    responseNotFoundError,
    responseSuccess,
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
} from "../constants/difficulty.constants.js";
import {
    RESPONSE_CODE_SUCCESS,
} from "../constants/response.constants.js";

export const getDifficultyList = async (request, response) => {
    try {
        const difficultyListResponse = await getDifficultyListFromDb();
        if (!difficultyListResponse.length) {
            return responseNotFoundError(
                response,
                [DIFFICULTY_LIST_NOT_FOUND_MESSAGE],
            );
        }

        const mappedDifficultyListResponse = mapGetDifficultyListResponse(difficultyListResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            DIFFICULTY_LIST_FOUND_MESSAGE,
            mappedDifficultyListResponse,
        );
    } catch (error) {
        console.error("Error in getDifficultyList: ", error);

        return responseError(
            response,
            [error.message],
        );
    }
};
