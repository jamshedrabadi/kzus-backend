import express from "express";
const router = express.Router();

import {
    getCountryList,
} from "../controllers/country.controller.js";

router.get("/get-country-list", getCountryList);

export default router;
