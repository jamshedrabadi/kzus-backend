export const PlayersTable = (sequelize, DataTypes) => {
    const Players = sequelize.define(
        "players",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            steam_id: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            tableName: "players",
        },
    );

    Players.associate = (models) => {
        Players.hasMany(models.Records, {
            foreignKey: "player_id",
        });
    };

    return Players;
};
