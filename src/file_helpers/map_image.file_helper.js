import {
    VALIDATION_ERROR_MESSAGES,
    MAP_IMAGE_ALLOWED_FILE_TYPES,
    MAP_IMAGE_SIZE_LIMIT,
} from "../constants/map_image.constants.js";

export const validateFile = (file) => {
    if (!checkFileExists(file)) {
        return VALIDATION_ERROR_MESSAGES.ERR_MSG_011;
    }
    if (!checkValidFileType(file)) {
        return VALIDATION_ERROR_MESSAGES.ERR_MSG_012;
    }
    if (!checkValidFileSize(file)) {
        return VALIDATION_ERROR_MESSAGES.ERR_MSG_013;
    }

    return null;
};

export const checkFileExists = (file) => {
    return file || false;
};

export const checkValidFileType = (file) => {
    return MAP_IMAGE_ALLOWED_FILE_TYPES.includes(file.mimetype) || false;
};

export const checkValidFileSize = (file) => {
    return file.size < MAP_IMAGE_SIZE_LIMIT || false;
};
