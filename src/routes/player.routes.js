import express from "express";
const router = express.Router();

import {
    createPlayer,
    updatePlayer,
    getPlayerData,
} from "../controllers/player.controller.js";

router.get("/get-player-data/:id", getPlayerData);
router.post("/create-player", createPlayer);
router.put("/update-player/:id", updatePlayer);

export default router;
