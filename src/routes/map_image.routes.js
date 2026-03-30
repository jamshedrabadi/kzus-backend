import express from "express";
const router = express.Router();

import { uploadSingleImage } from "../middlewares/upload.middleware.js";

import {
    uploadMapImage,
} from "../controllers/map_image.controller.js";

router.post("/upload-map-image/", uploadSingleImage, uploadMapImage);

export default router;
