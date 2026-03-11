import express from 'express';
const router = express.Router();

import {
    createPlayer,
    getPlayerData,
} from "../controllers/player.controller.js";

router.get('/get-player-data/:id', getPlayerData);
router.post('/create-player', createPlayer);

export default router;
