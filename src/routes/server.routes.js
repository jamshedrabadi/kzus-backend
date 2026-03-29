import express from "express";
const router = express.Router();

import {
    getServerList,
} from "../controllers/server.controller.js";

router.get("/get-server-list", getServerList);

export default router;
