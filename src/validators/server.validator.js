import Joi from "../lib/joi.js";
import {
    VALIDATION_ERROR_MESSAGES,
} from "../constants/server.constants.js";

export const updatePlayerCountSchema = Joi.object({
    currentPlayers: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_001,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_002,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_003,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_004,
        }),
});

export const updateMapNameSchema = Joi.object({
    mapName: Joi.string().trim().required()
        .messages({
            "string.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_005,
            "string.empty": VALIDATION_ERROR_MESSAGES.ERR_MSG_006,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_007,
        }),
});
