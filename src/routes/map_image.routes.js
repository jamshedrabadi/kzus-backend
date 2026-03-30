import express from "express";
const router = express.Router();

import {
    MAP_IMAGE_SIZE_LIMIT,
} from "../constants/map_image.constants.js";

import { createUploader } from "../middlewares/upload.middleware.js";
const mapImageUploadMiddleware = createUploader({ fileSize: MAP_IMAGE_SIZE_LIMIT }).single("file");

import {
    uploadMapImage,
} from "../controllers/map_image.controller.js";

router.post("/upload-map-image/", mapImageUploadMiddleware, uploadMapImage);

export default router;
