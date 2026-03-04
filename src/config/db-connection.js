export const dbConnection = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log(`PostgreSQL DB connected.`);
    } catch (error) {
        console.error(`Error connecting to PostgreSQL DB: ${error}`);
    }
}