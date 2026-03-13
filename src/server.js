/* eslint-disable no-console */

import "dotenv/config";
import express from "express";

import { dbConnection } from "./db/db-connection.js";
import { importRoutes } from "./routes/index.js";

const app = express();
app.use(express.json());

importRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

await dbConnection();
