import Joi from "../lib/joi.js";

export const createPlayerSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name cannot be empty",
            "any.required": "Name is required",
        }),
    country: Joi.string()
        .length(3)
        .pattern(/^[A-Z]{3}$/)
        .required()
        .messages({
            "string.base": "Country must be a string",
            "string.empty": "Country cannot be empty",
            "any.required": "Country is required",
            "string.length": "Country must be exactly 3 characters (ISO alpha-3)",
            "string.pattern.base": "Country must be an uppercase ISO alpha-3 code",
        }),
    steam_id: Joi.string()
        .pattern(/^\d{17}$/)
        .required()
        .messages({
            "string.base": "Steam ID must be a string",
            "string.empty": "Steam ID cannot be empty",
            "any.required": "Steam ID is required",
            "string.pattern.base": "Steam ID must be a 17 digit SteamID64",
        })
});
