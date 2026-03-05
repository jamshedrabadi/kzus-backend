import { DataTypes } from "sequelize";
import { sequelize } from "../config/db-config.js";

import { PlayersTable } from "./players.model.js";
import { MapsTable } from "./maps.model.js";

export const dbModels = () => {
    const models = {
        sequelize: sequelize,
        Players: PlayersTable(sequelize, DataTypes),
        Maps: MapsTable(sequelize, DataTypes),
    };

    Object.keys(models).forEach((modelName) => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });

    return models;
}
