import express from 'express';
const router = express.Router();

import {
    getPlayerData,
} from "../controllers/player.controller.js";

router.get('/get-player', getPlayerData);

export default router;
