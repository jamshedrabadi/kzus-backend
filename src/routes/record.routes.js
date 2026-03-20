import express from "express";
const router = express.Router();

import {
    upsertRecord,
    getRecordList,
} from "../controllers/record.controller.js";

router.get("/get-record-list", getRecordList);
router.put("/upsert-record", upsertRecord);

export default router;
