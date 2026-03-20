export const RECORD_MODULE = "record";

export const RECORD_BASE_POINTS = 100;

export const RECORD_CREATION_SUCCESS_MESSAGE = "Record inserted successfully.";
export const RECORD_BETTER_RECORD_EXISTS_MESSAGE = "Player has a better record on this map.";
export const RECORD_LIST_FOUND_MESSAGE = "Record list found.";
export const RECORD_LIST_NOT_FOUND_MESSAGE = "Record list not found.";

export const RECORD_MODES = [
    "pro",
    "nub",
];

export const RECORD_MODE_LOCK_VALUES = {
    pro: 1,
    nub: 2,
};

export const VALIDATION_ERROR_MESSAGES = {
    ERR_MSG_001: "Record player ID must be a number.",
    ERR_MSG_002: "Record player ID must be an integer.",
    ERR_MSG_003: "Record player ID is required.",
    ERR_MSG_004: "Record player ID must be a positive integer.",
    ERR_MSG_005: "Record map ID must be a number.",
    ERR_MSG_006: "Record map ID must be an integer.",
    ERR_MSG_007: "Record map ID is required.",
    ERR_MSG_008: "Record map ID must be a positive integer.",
    ERR_MSG_009: "Record time must be a number.",
    ERR_MSG_010: "Record time must be an integer.",
    ERR_MSG_011: "Record time is required.",
    ERR_MSG_012: "Record time must be a positive integer.",
    ERR_MSG_013: "Record mode must be a string.",
    ERR_MSG_014: "Record mode cannot be empty.",
    ERR_MSG_015: "Record mode is required.",
    ERR_MSG_016: `Record mode must be one of ${RECORD_MODES.join(", ")}`,
    ERR_MSG_017: "Record checkpoints must be a number.",
    ERR_MSG_018: "Record checkpoints must be an integer.",
    ERR_MSG_019: "Record checkpoints is required.",
    ERR_MSG_020: "Record checkpoints cannot be a negative integer.",
    ERR_MSG_021: "Record gochecks must be a number.",
    ERR_MSG_022: "Record gochecks must be an integer.",
    ERR_MSG_023: "Record gochecks is required.",
    ERR_MSG_024: "Record gochecks cannot be a negative integer.",
    ERR_MSG_025: "Difficulty must be a string.",
    ERR_MSG_026: "Difficulty cannot be empty.",
    ERR_MSG_027: "Difficulty must be a list of positive integers separated by commas (e.g., 1,2).",
    ERR_MSG_028: "Length must be a string.",
    ERR_MSG_029: "Length cannot be empty.",
    ERR_MSG_030: "Length must be a list of positive integers separated by commas (e.g., 1,2).",
    ERR_MSG_031: "Type must be a string.",
    ERR_MSG_032: "Type cannot be empty.",
    ERR_MSG_033: "Type must be a list of positive integers separated by commas (e.g., 1,2).",
    ERR_MSG_034: "Text must be a string.",
    ERR_MSG_035: "Text cannot be empty.",
    ERR_MSG_036: "Page must be a string.",
    ERR_MSG_037: "Page cannot be empty.",
    ERR_MSG_038: "Page is required.",
    ERR_MSG_039: "Page must be a positive integer.",
    ERR_MSG_040: "Limit must be a string.",
    ERR_MSG_041: "Limit cannot be empty.",
    ERR_MSG_042: "Limit is required.",
    ERR_MSG_043: "Limit must be a positive integer.",
    ERR_MSG_044: "Sort column must be a string.",
    ERR_MSG_045: "Sort column cannot be empty.",
    ERR_MSG_046: "Sort column is required.",
    ERR_MSG_047: "Sort column must be one of map, player, time, date, difficulty, length, type",
    ERR_MSG_048: "Sort direction must be a string.",
    ERR_MSG_049: "Sort direction cannot be empty.",
    ERR_MSG_050: "Sort direction is required.",
    ERR_MSG_051: "Sort direction must be one of asc, desc",
};
