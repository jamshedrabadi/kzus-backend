export const RECORD_MODULE = "record";

export const RECORD_CREATION_SUCCESS_MESSAGE = "Record inserted successfully.";

export const RECORD_MODES = [
    "pro",
    "nub",
];

export const VALIDATION_ERROR_MESSAGES = {
    ERR_MSG_001: "Record Player ID must be a number.",
    ERR_MSG_002: "Record Player ID must be an integer.",
    ERR_MSG_003: "Record Player ID is required.",
    ERR_MSG_004: "Record Player ID must be a positive integer.",
    ERR_MSG_005: "Record Map ID must be a number.",
    ERR_MSG_006: "Record Map ID must be an integer.",
    ERR_MSG_007: "Record Map ID is required.",
    ERR_MSG_008: "Record Map ID must be a positive integer.",
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
