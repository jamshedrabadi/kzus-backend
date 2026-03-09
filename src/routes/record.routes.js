import express from 'express';
const router = express.Router();

import {
    upsertRecord,
} from "../controllers/record.controller.js";

router.put('/upsert-record', upsertRecord);

export default router;
