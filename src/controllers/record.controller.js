import {
    upsertRecordInDb,
} from "../services/record.service.js";
import {
    responseSender,
} from "../utils/response.utils.js";
import {
    upsertRecordSchema,
} from "../validators/record.validator.js";
import {
    mapUpsertRecordRequest,
} from "../mappers/record.mapper.js";
import {
    RESPONSE_CODE_CREATED,
    RESPONSE_CODE_DUPLICATE,
} from "../constants/http.constants.js";
import {
    RECORD_MODULE,
    RECORD_CREATION_SUCCESS_MESSAGE,
    RECORD_BETTER_RECORD_EXISTS_MESSAGE,
} from "../constants/record.constants.js";

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
        responseData.module = RECORD_MODULE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
