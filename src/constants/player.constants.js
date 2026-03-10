export const PLAYER_MODULE = "player";

export const PLAYER_CREATION_SUCCESS_MESSAGE = "Player created successfully.";
export const PLAYER_CREATION_FAILURE_MESSAGE = "Error creating player.";
export const DUPLICATE_PLAYER_STEAMID = "Player with this steam id already exists.";

export const VALIDATION_ERROR_MESSAGES = {
    ERR_MSG_001: "Player name must be a string.",
    ERR_MSG_002: "Player name cannot be empty.",
    ERR_MSG_003: "Player name is required.",
    ERR_MSG_004: "Player country must be a string.",
    ERR_MSG_005: "Player country cannot be empty.",
    ERR_MSG_006: "Player country is required.",
    ERR_MSG_007: "Player country must be exactly 3 characters (ISO alpha-3).",
    ERR_MSG_008: "Player country must be an uppercase ISO alpha-3 code.",
    ERR_MSG_009: "Player steam ID must be a string.",
    ERR_MSG_010: "Player steam ID cannot be empty.",
    ERR_MSG_011: "Player steam ID is required.",
    ERR_MSG_012: "Player steam ID must be a 17 digit SteamID64.",
};
