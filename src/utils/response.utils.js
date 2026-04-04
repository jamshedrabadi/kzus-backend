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
    RESPONSE_MESSAGE_NOT_FOUND_ERROR,
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
            errors: [message],
            data: null,
        });
};

export const responseNotFoundError = (response, message) => {
    return response
        .status(RESPONSE_CODE_DATA_NOT_FOUND)
        .send({
            status: false,
            message: RESPONSE_MESSAGE_NOT_FOUND_ERROR,
            errors: [message],
            data: null,
        });
};

export const responseError = (response, message) => {
    return response
        .status(RESPONSE_CODE_INTERNAL_SERVER_ERROR)
        .send({
            status: false,
            message: RESPONSE_MESSAGE_INTERNAL_SERVER_ERROR,
            errors: [message],
            data: null,
        });
};

export const formatValidationError = (validationErrorMessage) => {
    return { details: [{ message: validationErrorMessage }] };
};

