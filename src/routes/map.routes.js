import express from "express";
const router = express.Router();

import {
    createMap,
} from "../controllers/map.controller.js";

router.post("/create-map", createMap);

export default router;
