import {
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { r2 } from "../lib/r2.js";
import {
    R2_BUCKET,
} from "../constants/r2.constants.js";

export const uploadToR2 = async (buffer, key, contentType) => {
    try {
        const command = new PutObjectCommand({
            Bucket: R2_BUCKET,
            Key: key, // e.g. maps/123/abc.webp
            Body: buffer,
            ContentType: contentType, // "image/webp"
        });

        await r2.send(command);

        return key;
    } catch (error) {
        console.error("Error in uploadToR2: ", error);
        throw error;
    }
};

export const deleteFromR2 = async (key) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: R2_BUCKET,
            Key: key,
        });

        return await r2.send(command);
    } catch (error) {
        console.error("Error in uploadToR2: ", error);
        throw error;
    }
};
