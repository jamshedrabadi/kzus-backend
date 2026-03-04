import 'dotenv/config';
import express from 'express'

import { sequelize } from './config/db-config.js';
import { dbConnection } from './config/db-connection.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

await dbConnection(sequelize);
