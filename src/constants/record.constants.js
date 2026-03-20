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
};
