import express from "express";
const router = express.Router();

import {
    createMap,
    getMapData,
} from "../controllers/map.controller.js";

router.get("/get-map-data/:id", getMapData);
router.post("/create-map", createMap);

export default router;
