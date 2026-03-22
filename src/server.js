/* eslint-disable no-console */

import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { dbConnection } from "./db/db-connection.js";
import { importRoutes } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(morgan("dev"));

importRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

await dbConnection();
