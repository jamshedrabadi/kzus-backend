import express from "express";
const router = express.Router();

import {
    getServerList,
    updatePlayerCount,
    updateMapName,
} from "../controllers/server.controller.js";

router.get("/get-server-list", getServerList);
router.patch("/update-player-count/:id", updatePlayerCount);
router.patch("/update-map-name/:id", updateMapName);

export default router;
