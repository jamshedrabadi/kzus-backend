import express from "express";
const router = express.Router();

import {
    getServerList,
    updatePlayerCount,
} from "../controllers/server.controller.js";

router.get("/get-server-list", getServerList);
router.patch("/update-player-count/:id", updatePlayerCount);

export default router;
