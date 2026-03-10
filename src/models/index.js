import { DataTypes } from "sequelize";
import { sequelize } from "../config/db-config.js";

import { PlayersTable } from "./players.model.js";
import { MapsTable } from "./maps.model.js";
import { RecordsTable } from "./records.model.js";
import { DifficultyTable } from "./difficulty.model.js";

const dbModels = {
    sequelize: sequelize,
    Players: PlayersTable(sequelize, DataTypes),
    Maps: MapsTable(sequelize, DataTypes),
    Records: RecordsTable(sequelize, DataTypes),
    Difficulty: DifficultyTable(sequelize, DataTypes),
};

Object.keys(dbModels).forEach((model) => {
    if (dbModels[model].associate) {
        dbModels[model].associate(dbModels);
    }
});

export default dbModels;
