import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_DUPLICATE,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_UNPROCESSABLE_ENTITY,
} from "../constants/http.constants.js";
import {
    PLAYER_MODULE,
    PLAYER_CREATION_FAILURE_MESSAGE,
    DUPLICATE_PLAYER_STEAMID_MESSAGE,
} from "../constants/player.constants.js";
import {
    MAP_MODULE,
    MAP_CREATION_FAILURE_MESSAGE,
    DUPLICATE_MAP_NAME,
} from "../constants/map.constants.js";
import {
    UNIQUE_CONSTRAINT_ERROR,
} from "../constants/database.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
    RESPONSE_MESSAGE_VALIDATION_ERROR,
} from "../constants/common.constants.js";

export const responseSender = (response, status, statusCode, message, error, module, data) => {
    const responseStatus = !!status;
    let responseStatusCode = statusCode;
    let responseMessage = message;
    let responseErrors = [];
    let responseData = null;

    if (error && error.details) { // validation errors
        responseStatusCode = RESPONSE_CODE_UNPROCESSABLE_ENTITY;
        responseMessage = RESPONSE_MESSAGE_VALIDATION_ERROR;
        responseErrors = error.details.map(err => err.message);
    } else if (!responseStatus && !responseStatusCode && !responseMessage) { // Determine DB error
        const dbError = checkDatabaseError(error, module);

        responseStatusCode = dbError.code;
        responseMessage = dbError.message;
        responseErrors = dbError.errors;
    } else {
        responseStatusCode = isNaN(statusCode) ? RESPONSE_CODE_DATA_NOT_FOUND : statusCode;
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
}

export const checkDatabaseError = (dbError, module) => {
    let code = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
    let message = RESPONSE_MESSAGE_DATA_NOT_FOUND;
    let errors = [];

    if (dbError.name === UNIQUE_CONSTRAINT_ERROR && module === PLAYER_MODULE) {
        code = RESPONSE_CODE_DUPLICATE;
        message = PLAYER_CREATION_FAILURE_MESSAGE;
        // errors = [dbError.errors[0].message]
        errors = [DUPLICATE_PLAYER_STEAMID_MESSAGE];
    }
    if (dbError.name === UNIQUE_CONSTRAINT_ERROR && module === MAP_MODULE) {
        code = RESPONSE_CODE_DUPLICATE;
        message = MAP_CREATION_FAILURE_MESSAGE;
        // errors = [dbError.errors[0].message]
        errors = [DUPLICATE_MAP_NAME];
    }

    return { code, message, errors };
}