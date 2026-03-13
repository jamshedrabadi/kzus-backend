import Joi from "../lib/joi.js";
import { VALIDATION_ERROR_MESSAGES } from "../constants/player.constants.js";

export const createPlayerSchema = Joi.object({
    name: Joi.string().trim().required()
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_001,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_002,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_003,
        }),
    country: Joi.string().trim().required()
        .length(3)
        .pattern(/^[A-Z]{3}$/)
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_004,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_005,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_006,
            "string.length": VALIDATION_ERROR_MESSAGES.ERR_MSG_007,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_008,
        }),
    steamId: Joi.string().trim().required()
        .pattern(/^\d{17}$/)
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_009,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_010,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_011,
            "string.pattern.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_012,
        }),
});
