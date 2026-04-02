export const MAP_IMAGE_MODULE = "map_image";

export const MAP_IMAGE_MAX_LIMIT = 5;
export const MAP_IMAGE_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB

export const MAP_IMAGE_FOLDER_NAME = "map_images";
export const MAP_IMAGE_CONTENT_TYPE = "image/webp";
export const MAP_IMAGE_FILE_TYPE = "webp";

export const MAP_IMAGE_UPLOAD_SUCCESS_MESSAGE = "Map image uploaded successfully.";
export const MAP_IMAGE_UPLOAD_FAILURE_MESSAGE = "Error uploading map image.";
export const MAP_IMAGE_EXISTING_ID_NOT_FOUND_MESSAGE = "Existing image ID not found.";
export const MAP_IMAGE_MAX_LIMIT_REACHED_MESSAGE = `Maximum image limit reached for the map.`;

export const MAP_IMAGE_ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

export const MAP_IMAGE_MIN_ASPECT_RATIO = 1.70;
export const MAP_IMAGE_MAX_ASPECT_RATIO = 1.85;

export const VALIDATION_ERROR_MESSAGES = {
    ERR_MSG_001: "Map image ID must be a number.",
    ERR_MSG_002: "Map image ID must be an integer.",
    ERR_MSG_003: "Map image ID must be a positive integer.",
    ERR_MSG_004: "Map image map ID must be a number.",
    ERR_MSG_005: "Map image map ID must be an integer.",
    ERR_MSG_006: "Map image map ID is required.",
    ERR_MSG_007: "Map image map ID must be a positive integer.",
    ERR_MSG_008: "Map image display order must be a number.",
    ERR_MSG_009: "Map image display order must be an integer.",
    ERR_MSG_010: "Map image display order must be a positive integer.",
    ERR_MSG_011: "Map image file is required.",
    ERR_MSG_012: "Map image file type must be one of JPEG, PNG, WEBP.",
    ERR_MSG_013: "Map image file size is too big.",
    ERR_MSG_014: "Map image file aspect ratio must be ~16:9.",
};
