import express from "express";
const router = express.Router();

import {
    getLengthList,
} from "../controllers/length.controller.js";

router.get("/get-length-list", getLengthList);

export default router;
