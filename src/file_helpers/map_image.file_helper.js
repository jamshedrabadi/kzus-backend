import sharp from "sharp";

import {
    VALIDATION_ERROR_MESSAGES,
    MAP_IMAGE_ALLOWED_FILE_TYPES,
    MAP_IMAGE_SIZE_LIMIT,
    MAP_IMAGE_MIN_ASPECT_RATIO,
    MAP_IMAGE_MAX_ASPECT_RATIO,
} from "../constants/map_image.constants.js";

export const validateFile = async (file) => {
    if (!checkFileExists(file)) {
        return VALIDATION_ERROR_MESSAGES.ERR_MSG_011;
    }
    if (!checkValidFileType(file)) {
        return VALIDATION_ERROR_MESSAGES.ERR_MSG_012;
    }
    if (!checkValidFileSize(file)) {
        return VALIDATION_ERROR_MESSAGES.ERR_MSG_013;
    }
    if (!await checkValidFileAspectRatio(file)) {
        return VALIDATION_ERROR_MESSAGES.ERR_MSG_014;
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

export const checkValidFileAspectRatio = async (file) => {
    const image = sharp(file.buffer);
    const metadata = await image.metadata();

    const { width, height } = metadata;
    const ratio = width / height;

    return (ratio >= MAP_IMAGE_MIN_ASPECT_RATIO && ratio <= MAP_IMAGE_MAX_ASPECT_RATIO) || false;
};
