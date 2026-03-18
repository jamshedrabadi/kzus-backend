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

export const getMapListSchema = Joi.object({
    difficulty: Joi.string().trim().allow("").optional()
        .regex(/^[1-9]\d*(,[1-9]\d*)*$/) // comma separated positive integers
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_016,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_017,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_018,
        }),
    length: Joi.string().trim().allow("").optional()
        .regex(/^[1-9]\d*(,[1-9]\d*)*$/) // comma separated positive integers
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_019,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_020,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_021,
        }),
    type: Joi.string().trim().allow("").optional()
        .regex(/^[1-9]\d*(,[1-9]\d*)*$/) // comma separated positive integers
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_022,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_023,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_024,
        }),
    text: Joi.string().trim().allow("").optional()
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_025,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_026,
        }),
    page: Joi.string().trim().required()
        .regex(/^[1-9]\d*$/) // positive integer
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_027,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_028,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_029,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_030,
        }),
    limit: Joi.string().trim().required()
        .regex(/^[1-9]\d*$/) // positive integer
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_031,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_032,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_033,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_034,
        }),
});
