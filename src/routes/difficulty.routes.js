import express from "express";
const router = express.Router();

import {
    getDifficultyList,
} from "../controllers/difficulty.controller.js";

router.get("/get-difficulty-list", getDifficultyList);

export default router;
