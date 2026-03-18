import express from "express";
const router = express.Router();

import {
    createMap,
    updateMap,
    getMapData,
    getMapList,
} from "../controllers/map.controller.js";

router.get("/get-map-data/:id", getMapData);
router.get("/get-map-list/", getMapList);
router.post("/create-map", createMap);
router.put("/update-map/:id", updateMap);

export default router;
