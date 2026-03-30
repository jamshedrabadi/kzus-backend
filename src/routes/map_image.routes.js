import express from "express";
const router = express.Router();

import { createUploader } from "../middlewares/upload.middleware.js";
const mapImageUploadMiddleware = createUploader().single("map_image");

import {
    uploadMapImage,
} from "../controllers/map_image.controller.js";

router.post("/upload-map-image/", mapImageUploadMiddleware, uploadMapImage);

export default router;
