import Joi from "../lib/joi.js";
import {
    VALIDATION_ERROR_MESSAGES,
    RECORD_MODES,
} from "../constants/record.constants.js";

export const upsertRecordSchema = Joi.object({
    playerId: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_001,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_002,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_003,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_004,
        }),
    mapId: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_005,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_006,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_007,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_008,
        }),
    time: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_009,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_010,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_011,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_012,
        }),
    mode: Joi.string().trim().required()
        .valid(...RECORD_MODES)
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_013,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_014,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_015,
            "any.only": VALIDATION_ERROR_MESSAGES.ERR_MSG_016,
        }),
    cp: Joi.number().integer().required()
        .min(0)
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_017,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_018,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_019,
            "number.min": VALIDATION_ERROR_MESSAGES.ERR_MSG_020,
        }),
    gc: Joi.number().integer().required()
        .min(0)
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_021,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_022,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_023,
            "number.min": VALIDATION_ERROR_MESSAGES.ERR_MSG_024,
        }),
});

export const getRecordListSchema = Joi.object({
    difficulty: Joi.string().trim().allow("").optional()
        .regex(/^[1-9]\d*(,[1-9]\d*)*$/) // comma separated positive integers
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_025,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_026,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_027,
        }),
    length: Joi.string().trim().allow("").optional()
        .regex(/^[1-9]\d*(,[1-9]\d*)*$/) // comma separated positive integers
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_028,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_029,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_030,
        }),
    type: Joi.string().trim().allow("").optional()
        .regex(/^[1-9]\d*(,[1-9]\d*)*$/) // comma separated positive integers
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_031,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_032,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_033,
        }),
    text: Joi.string().trim().allow("").optional()
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_034,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_035,
        }),
    page: Joi.string().trim().required()
        .regex(/^[1-9]\d*$/) // positive integer
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_036,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_037,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_038,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_039,
        }),
    limit: Joi.string().trim().required()
        .regex(/^[1-9]\d*$/) // positive integer
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_040,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_041,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_042,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_043,
        }),
    sortColumn: Joi.string().trim().required()
        .valid("map", "player", "time", "date", "difficulty", "length", "type")
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_044,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_045,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_046,
            "any.only": VALIDATION_ERROR_MESSAGES.ERR_MSG_047,
        }),
    sortDirection: Joi.string().trim().required()
        .valid("asc", "desc")
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_048,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_049,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_050,
            "any.only": VALIDATION_ERROR_MESSAGES.ERR_MSG_051,
        }),
});
