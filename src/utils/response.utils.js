import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_DUPLICATE,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_UNPROCESSABLE_ENTITY,
} from "../constants/http.constants.js";
import {
    RESPONSE_MESSAGE_VALIDATION_ERROR,
    RESPONSE_MESSAGE_CONFLICT_ERROR,
    RESPONSE_MESSAGE_INTERNAL_SERVER_ERROR,
} from "../constants/common.constants.js";

export const responseSuccess = (response, code, message, data) => {
    return response
        .status(code)
        .send({
            status: true,
            message: message,
            errors: null,
            data: data || null,
        });
};

export const responseValidationError = (response, error) => {
    return response
        .status(RESPONSE_CODE_UNPROCESSABLE_ENTITY)
        .send({
            status: false,
            message: RESPONSE_MESSAGE_VALIDATION_ERROR,
            errors: error.details.map(err => err.message),
            data: null,
        });
};

export const responseDuplicateError = (response, message) => {
    return response
        .status(RESPONSE_CODE_DUPLICATE)
        .send({
            status: false,
            message: RESPONSE_MESSAGE_CONFLICT_ERROR,
            errors: message,
            data: null,
        });
};

export const responseNotFoundError = (response, message) => {
    return response
        .status(RESPONSE_CODE_DATA_NOT_FOUND)
        .send({
            status: false,
            message: message,
            errors: null,
            data: null,
        });
};

export const responseCustomError = (response, code, message) => {
    return response
        .status(code)
        .send({
            status: false,
            message: message,
            errors: null,
            data: null,
        });
};

export const responseError = (response, error) => {
    return response
        .status(RESPONSE_CODE_INTERNAL_SERVER_ERROR)
        .send({
            status: false,
            message: RESPONSE_MESSAGE_INTERNAL_SERVER_ERROR,
            errors: error.message,
            data: null,
        });
};

/*
 * export const getDatabaseError = (dbError, module) => {
 *     let code = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
 *     let message = RESPONSE_MESSAGE_DATA_NOT_FOUND;
 *     let errors = [];
 *     const dbErrorCode = (dbError && dbError.cause && dbError.cause.code) || null;
 *     if (dbErrorCode && dbErrorCode === POSTGRES_VIOLATION_CODES.UNIQUE_CONSTRAINT
 *         && module === PLAYER_MODULE) {
 *         code = RESPONSE_CODE_DUPLICATE;
 *         message = PLAYER_SAVE_FAILURE_MESSAGE;
 *         errors = [DUPLICATE_PLAYER_STEAMID_MESSAGE];
 *     }
 *     if (dbErrorCode && dbErrorCode === POSTGRES_VIOLATION_CODES.UNIQUE_CONSTRAINT
 *         && module === MAP_MODULE) {
 *         code = RESPONSE_CODE_DUPLICATE;
 *         message = MAP_SAVE_FAILURE_MESSAGE;
 *         errors = [DUPLICATE_MAP_NAME];
 *     }
 *     return { code, message, errors };
 * };
 */

export const formatValidationError = (validationErrorMessage) => {
    return { details: [{ message: validationErrorMessage }] };
};

