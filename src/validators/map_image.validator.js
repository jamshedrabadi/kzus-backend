import Joi from "../lib/joi.js";
import { VALIDATION_ERROR_MESSAGES } from "../constants/map_image.constants.js";

export const uploadMapImageSchema = Joi.object({
    id: Joi.number().integer().optional()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_001,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_002,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_003,
        }),
    mapId: Joi.number().integer().required()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_004,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_005,
            "any.required": VALIDATION_ERROR_MESSAGES.ERR_MSG_006,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_007,
        }),
    displayOrder: Joi.number().integer().optional()
        .positive()
        .messages({
            "number.base": VALIDATION_ERROR_MESSAGES.ERR_MSG_008,
            "number.integer": VALIDATION_ERROR_MESSAGES.ERR_MSG_009,
            "number.positive": VALIDATION_ERROR_MESSAGES.ERR_MSG_010,
        }),
    mapImage: Joi.any().optional(),
});
