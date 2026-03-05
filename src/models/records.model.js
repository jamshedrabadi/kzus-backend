import { RECORD_MODES } from "../constants/constants.js";

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
            },
            gc: {
                type: DataTypes.INTEGER,
            },
            points: {
                type: DataTypes.INTEGER,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            tableName: "records",
            timestamps: false
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
