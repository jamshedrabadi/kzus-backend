import { MAP_LENGTHS, MAP_TYPES } from "../constants/map.constants.js";

export const MapsTable = (sequelize, DataTypes) => {
    const Maps = sequelize.define(
        "maps",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            difficulty_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "difficulty",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            length: {
                type: DataTypes.ENUM({ values: MAP_LENGTHS }),
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM({ values: MAP_TYPES }),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            tableName: "maps",
        },
    );

    Maps.associate = (models) => {
        Maps.hasMany(models.Records, {
            foreignKey: "map_id",
        });

        Maps.belongsTo(models.Difficulty, {
            foreignKey: "difficulty_id",
        });
    };

    return Maps;
};
