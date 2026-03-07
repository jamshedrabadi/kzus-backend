import express from 'express';
const router = express.Router();

import {
    getPlayerData,
    createPlayer,
} from "../controllers/player.controller.js";

router.get('/get-player', getPlayerData);
router.post('/create-player', createPlayer);

export default router;
