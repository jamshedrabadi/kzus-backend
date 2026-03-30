import multer from "multer";

const storage = multer.memoryStorage();

export const createUploader = (options = {}) => {
    return multer({
        storage: storage,
        limits: {
            fileSize: options.fileSize,
        },
    });
};
