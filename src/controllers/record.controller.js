import {
    checkExistingRecord,
    insertRecord,
} from "../services/record.service.js";
import { responseSender } from "../utils/response.utils.js";
import {
    RESPONSE_CODE_CREATED,
} from "../constants/http.constants.js";
import {
    RECORD_MODULE,
    RECORD_CREATION_SUCCESS_MESSAGE,
} from "../constants/record.constants.js";
import { upsertRecordSchema } from "../validators/record.validator.js";

export const upsertRecord = async (request, response) => {
    const responseData = { status: false, statusCode: 0, message: "", error: null, module: "" };

    try {
        const recordData = request.body;

        await upsertRecordSchema.validateAsync(recordData);

        const existingData = await checkExistingRecord(recordData);
        console.log("existingData --- ", existingData);

        if (!existingData) {
            recordData.points = 0; // todo: remove
            await insertRecord(recordData);

            responseData.status = true;
            responseData.statusCode = RESPONSE_CODE_CREATED;
            responseData.message = RECORD_CREATION_SUCCESS_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.error, responseData.module);
        }

        // responseData.status = true;
        // responseData.statusCode = RESPONSE_CODE_CREATED;
        // responseData.message = MAP_CREATION_SUCCESS_MESSAGE;
    } catch (error) {
        console.error("Error in upsertRecord: ", error);

        responseData.error = error;
        responseData.module = RECORD_MODULE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.error, responseData.module);
    }
}