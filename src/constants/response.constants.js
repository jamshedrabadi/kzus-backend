export const RESPONSE_CODE_SUCCESS = 200;
export const RESPONSE_CODE_CREATED = 201;
export const RESPONSE_CODE_DATA_NOT_FOUND_ERROR = 404;
export const RESPONSE_CODE_CONFLICT_ERROR = 409;
export const RESPONSE_CODE_UNPROCESSABLE_ENTITY_ERROR = 422;
export const RESPONSE_CODE_INTERNAL_SERVER_ERROR = 500;

export const RESPONSE_MESSAGE_VALIDATION_ERROR = "Validation error.";
export const RESPONSE_MESSAGE_CONFLICT_ERROR = "Conflict error.";
export const RESPONSE_MESSAGE_NOT_FOUND_ERROR = "Not found error.";
export const RESPONSE_MESSAGE_INTERNAL_SERVER_ERROR = "Internal server error.";

export const VALIDATION_ERROR = "validationError";
export const CONFLICT_ERROR = "conflictError";
export const NOT_FOUND_ERROR = "notFoundError";
export const INTERNAL_SERVER_ERROR = "internalServerError";

export const RESPONSE_TYPE_MAPPING = {
    [VALIDATION_ERROR]: {
        status: RESPONSE_CODE_UNPROCESSABLE_ENTITY_ERROR,
        message: RESPONSE_MESSAGE_VALIDATION_ERROR,
    },
    [CONFLICT_ERROR]: {
        status: RESPONSE_CODE_CONFLICT_ERROR,
        message: RESPONSE_MESSAGE_CONFLICT_ERROR,
    },
    [NOT_FOUND_ERROR]: {
        status: RESPONSE_CODE_DATA_NOT_FOUND_ERROR,
        message: RESPONSE_MESSAGE_NOT_FOUND_ERROR,
    },
    [INTERNAL_SERVER_ERROR]: {
        status: RESPONSE_CODE_INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE_INTERNAL_SERVER_ERROR,
    },
};
