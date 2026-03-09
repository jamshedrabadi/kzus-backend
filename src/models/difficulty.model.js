export const DifficultyTable = (sequelize, DataTypes) => {
    const Difficulty = sequelize.define(
        "difficulty",
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
            order_index: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            multiplier: {
                type: DataTypes.DECIMAL(4, 2),
                allowNull: false,
            },
        },
        {
            tableName: "difficulty"
        },
    );

    Difficulty.associate = (models) => {
        Difficulty.hasMany(models.Maps, {
            foreignKey: "difficulty_id",
        });
    };

    return Difficulty;
};
