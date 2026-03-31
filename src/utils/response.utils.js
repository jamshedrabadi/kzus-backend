import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_DUPLICATE,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_UNPROCESSABLE_ENTITY,
} from "../constants/http.constants.js";
import {
    PLAYER_MODULE,
    PLAYER_SAVE_FAILURE_MESSAGE,
    DUPLICATE_PLAYER_STEAMID_MESSAGE,
} from "../constants/player.constants.js";
import {
    MAP_MODULE,
    MAP_SAVE_FAILURE_MESSAGE,
    DUPLICATE_MAP_NAME,
} from "../constants/map.constants.js";
import {
    POSTGRES_VIOLATION_CODES,
} from "../constants/database.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
    RESPONSE_MESSAGE_VALIDATION_ERROR,
} from "../constants/common.constants.js";

export const responseSender = (response, status, statusCode, message, data, error, module) => {
    const responseStatus = !!status;
    let responseStatusCode = statusCode;
    let responseMessage = message;
    let responseErrors = null;
    let responseData = null;

    if (error && error.details) { // validation errors
        responseStatusCode = RESPONSE_CODE_UNPROCESSABLE_ENTITY;
        responseMessage = RESPONSE_MESSAGE_VALIDATION_ERROR;
        responseErrors = error.details.map(err => err.message);
    } else if (!responseStatus && !responseStatusCode && !responseMessage) { // Determine DB error
        const dbError = getDatabaseError(error, module);

        responseStatusCode = dbError.code;
        responseMessage = dbError.message;
        responseErrors = dbError.errors;
    } else {
        responseStatusCode = (!statusCode || isNaN(statusCode))
            ? RESPONSE_CODE_DATA_NOT_FOUND : statusCode;
        responseMessage = (!message || (message.length === 0 || Object.keys(message).length === 0))
            ? { success: false, errorMessage: RESPONSE_MESSAGE_DATA_NOT_FOUND } : message;
        responseData = data;
    }

    return response.status(responseStatusCode)
        .send({
            status: responseStatus,
            message: responseMessage,
            errors: responseErrors,
            data: responseData,
        });
};

export const getDatabaseError = (dbError, module) => {
    let code = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
    let message = RESPONSE_MESSAGE_DATA_NOT_FOUND;
    let errors = [];

    const dbErrorCode = (dbError && dbError.cause && dbError.cause.code) || null;

    if (dbErrorCode && dbErrorCode === POSTGRES_VIOLATION_CODES.UNIQUE_CONSTRAINT
        && module === PLAYER_MODULE) {

        code = RESPONSE_CODE_DUPLICATE;
        message = PLAYER_SAVE_FAILURE_MESSAGE;
        errors = [DUPLICATE_PLAYER_STEAMID_MESSAGE];
    }
    if (dbErrorCode && dbErrorCode === POSTGRES_VIOLATION_CODES.UNIQUE_CONSTRAINT
        && module === MAP_MODULE) {

        code = RESPONSE_CODE_DUPLICATE;
        message = MAP_SAVE_FAILURE_MESSAGE;
        errors = [DUPLICATE_MAP_NAME];
    }

    return { code, message, errors };
};

export const formatValidationError = (validationErrorMessage) => {
    return { details: [{ message: validationErrorMessage }] };
};

