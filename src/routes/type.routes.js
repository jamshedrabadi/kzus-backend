import express from "express";
const router = express.Router();

import {
    getTypeList,
} from "../controllers/type.controller.js";

router.get("/get-type-list", getTypeList);

export default router;
