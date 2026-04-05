import {
    RESPONSE_TYPE_MAPPING,
} from "../constants/response.constants.js";

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

export const responseError = (type, response, errors) => {
    const { status, message } = RESPONSE_TYPE_MAPPING[type];

    return response
        .status(status)
        .send({
            status: false,
            message: message,
            errors: errors,
            data: null,
        });
};

export const formatValidationErrorResponse = (error) => {
    return error.details.map(err => err.message);
};

export const convertToValidationError = (errorMessage) => {
    return { details: [{ message: errorMessage }] };
};
