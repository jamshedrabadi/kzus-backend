import {
    upsertRecordInDb,
    getRecordListFromDb,
} from "../services/record.service.js";
import {
    responseSender,
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
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_DUPLICATE,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    RECORD_MODULE,
    RECORD_CREATION_SUCCESS_MESSAGE,
    RECORD_BETTER_RECORD_EXISTS_MESSAGE,
    RECORD_LIST_FOUND_MESSAGE,
    RECORD_LIST_NOT_FOUND_MESSAGE,
} from "../constants/record.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
} from "../constants/common.constants.js";

export const upsertRecord = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: RECORD_MODULE,
    };

    try {
        const recordData = request.body;

        await upsertRecordSchema.validateAsync(recordData);

        const mappedRecordData = mapUpsertRecordRequest(recordData); // change in check

        const upsertedRecord = await upsertRecordInDb(mappedRecordData);
        if (!upsertedRecord.success) {
            responseData.statusCode = RESPONSE_CODE_DUPLICATE;
            responseData.message = RECORD_BETTER_RECORD_EXISTS_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_CREATED;
        responseData.message = RECORD_CREATION_SUCCESS_MESSAGE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in upsertRecord: ", error);

        responseData.error = error;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};

export const getRecordList = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: RECORD_MODULE,
    };

    try {
        const recordListResponse = await getRecordListFromDb();
        if (!recordListResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = RECORD_LIST_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedRecordListResponse = mapGetRecordListResponse(recordListResponse);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = RECORD_LIST_FOUND_MESSAGE;
        responseData.data = mappedRecordListResponse;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);

    } catch (error) {
        console.error("Error in getRecordList: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
