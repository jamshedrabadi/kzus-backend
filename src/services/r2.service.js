import {
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { r2 } from "../lib/r2.js";
import {
    BASE_URL,
    R2_BUCKET,
} from "../constants/r2.constants.js";

export const uploadToR2 = async (buffer, key, contentType) => {
    const command = new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key, // e.g. maps/123/abc.webp
        Body: buffer,
        ContentType: contentType, // "image/webp"
    });

    await r2.send(command);

    return `${BASE_URL}/${key}`;
};

export const deleteFromR2 = async (key) => {
    const command = new DeleteObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
    });

    await r2.send(command);
};
