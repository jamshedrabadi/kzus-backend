import Joi from "../lib/joi.js";
import {
    VALIDATION_ERROR_MESSAGES,
    MAP_LENGTHS,
    MAP_TYPES,
} from "../constants/map.constants.js";

export const createMapSchema = Joi.object({
    name: Joi.string().trim().required()
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_001,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_002,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_003,
        }),
    difficulty_id: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_004,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_005,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_006,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_007,
        }),
    length: Joi.string().trim().required()
        .valid(...MAP_LENGTHS)
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_008,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_009,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_010,
            "any.only": VALIDATION_ERROR_MESSAGES.ERR_MSG_011,
        }),
    type: Joi.string().trim().required()
        .valid(...MAP_TYPES)
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_012,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_013,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_014,
            "any.only": VALIDATION_ERROR_MESSAGES.ERR_MSG_015,
        }),
});
