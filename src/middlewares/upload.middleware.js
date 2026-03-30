import multer from "multer";

import {
    GLOBAL_FILE_SIZE_LIMIT,
} from "../constants/common.constants.js";

const storage = multer.memoryStorage();

export const createUploader = () => {
    return multer({
        storage: storage,
        limits: {
            fileSize: GLOBAL_FILE_SIZE_LIMIT,
        },
    });
};
