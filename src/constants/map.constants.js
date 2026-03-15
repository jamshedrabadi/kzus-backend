export const MAP_MODULE = "map";

export const MAP_CREATION_SUCCESS_MESSAGE = "Map created successfully.";
export const MAP_UPDATION_SUCCESS_MESSAGE = "Map updated successfully.";
export const MAP_SAVE_FAILURE_MESSAGE = "Error saving map data.";
export const DUPLICATE_MAP_NAME = "Map with this name already exists.";
export const MAP_FOUND_MESSAGE = "Map data found.";
export const MAP_NOT_FOUND_MESSAGE = "Map not found.";

export const MAP_LENGTHS = [
    "very-long",
    "long",
    "middle",
    "short",
    "very-short",
];

export const MAP_TYPES = [
    "bhop",
    "climb",
    "mix",
    "slide",
    "special",
];

export const VALIDATION_ERROR_MESSAGES = {
    ERR_MSG_001: "Map name must be a string.",
    ERR_MSG_002: "Map name cannot be empty.",
    ERR_MSG_003: "Map name is required.",
    ERR_MSG_004: "Map Difficulty ID must be a number.",
    ERR_MSG_005: "Map Difficulty ID must be an integer.",
    ERR_MSG_006: "Map Difficulty ID is required.",
    ERR_MSG_007: "Map Difficulty ID must be a positive integer.",
    ERR_MSG_008: "Map length must be a string.",
    ERR_MSG_009: "Map length cannot be empty.",
    ERR_MSG_010: "Map length is required.",
    ERR_MSG_011: `Map length must be one of ${MAP_LENGTHS.join(", ")}`,
    ERR_MSG_012: "Map type must be a string.",
    ERR_MSG_013: "Map type cannot be empty.",
    ERR_MSG_014: "Map type is required.",
    ERR_MSG_015: `Map type must be one of ${MAP_TYPES.join(", ")}`,
};
