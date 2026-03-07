import express from 'express';
const router = express.Router();

import {
    createPlayer,
} from "../controllers/player.controller.js";

router.post('/create-player', createPlayer);

export default router;
