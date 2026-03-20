import express from "express";
const router = express.Router();

import {
    createPlayer,
    updatePlayer,
    getPlayerData,
    getPlayerList,
} from "../controllers/player.controller.js";

router.get("/get-player-data/:id", getPlayerData);
router.get("/get-player-list", getPlayerList);
router.post("/create-player", createPlayer);
router.put("/update-player/:id", updatePlayer);

export default router;
