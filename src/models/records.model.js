import { RECORD_MODES } from "../constants/record.constants.js";

export const RecordsTable = (sequelize, DataTypes) => {
    const Records = sequelize.define(
        "records",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "players",
                    key: "id"
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            map_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "maps",
                    key: "id"
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            time: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mode: {
                type: DataTypes.ENUM({ values: RECORD_MODES }),
                allowNull: false,
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            gc: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            points: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            tableName: "records",
        },
    );

    Records.associate = (models) => {
        Records.belongsTo(models.Players, {
            foreignKey: "player_id",
        });

        Records.belongsTo(models.Maps, {
            foreignKey: "map_id",
        });
    };

    return Records;
};
