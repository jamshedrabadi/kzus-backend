import 'dotenv/config';
import express from 'express'

import { dbConnection } from './config/db-connection.js';
import { dbModels } from './models/index.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

await dbConnection(dbModels().sequelize);
