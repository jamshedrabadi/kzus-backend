import Joi from "../lib/joi.js";
import {
    VALIDATION_ERROR_MESSAGES,
} from "../constants/map.constants.js";

export const createOrUpdateMapSchema = Joi.object({
    name: Joi.string().trim().required()
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_001,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_002,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_003,
        }),
    difficultyId: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_004,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_005,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_006,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_007,
        }),
    lengthId: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_008,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_009,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_010,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_011,
        }),
    typeId: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_012,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_013,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_014,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_015,
        }),
});
