import {
    upsertRecordInDb,
    getRecordListFromDb,
} from "../services/record.service.js";
import {
    responseDuplicateError,
    responseError,
    responseNotFoundError,
    responseSuccess,
    responseValidationError,
} from "../utils/response.utils.js";
import {
    upsertRecordSchema,
} from "../validators/record.validator.js";
import {
    mapUpsertRecordRequest,
    mapGetRecordListResponse,
} from "../mappers/record.mapper.js";
import {
    RESPONSE_CODE_CREATED,
    RESPONSE_CODE_SUCCESS,
} from "../constants/response.constants.js";
import {
    RECORD_CREATION_SUCCESS_MESSAGE,
    RECORD_BETTER_RECORD_EXISTS_MESSAGE,
    RECORD_LIST_FOUND_MESSAGE,
    RECORD_LIST_NOT_FOUND_MESSAGE,
} from "../constants/record.constants.js";

export const upsertRecord = async (request, response) => {
    try {
        const recordData = request.body;

        const validateRequest = upsertRecordSchema.validate(recordData);
        if (validateRequest.error) {
            return responseValidationError(
                response,
                validateRequest.error.details.map(err => err.message),
            );
        }

        const mappedRecordData = mapUpsertRecordRequest(recordData); // change in check

        const upsertedRecord = await upsertRecordInDb(mappedRecordData);
        if (!upsertedRecord.success) {
            return responseDuplicateError(
                response,
                [RECORD_BETTER_RECORD_EXISTS_MESSAGE],
            );
        }

        return responseSuccess(
            response,
            RESPONSE_CODE_CREATED,
            RECORD_CREATION_SUCCESS_MESSAGE,
        );
    } catch (error) {
        console.error("Error in upsertRecord: ", error);

        return responseError(
            response,
            [error.message],
        );
    }
};

export const getRecordList = async (request, response) => {
    try {
        const recordListResponse = await getRecordListFromDb();
        if (!recordListResponse.length) {
            return responseNotFoundError(
                response,
                [RECORD_LIST_NOT_FOUND_MESSAGE],
            );
        }

        const mappedRecordListResponse = mapGetRecordListResponse(recordListResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            RECORD_LIST_FOUND_MESSAGE,
            mappedRecordListResponse,
        );
    } catch (error) {
        console.error("Error in getRecordList: ", error);

        return responseError(
            response,
            [error.message],
        );
    }
};
