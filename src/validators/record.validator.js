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
