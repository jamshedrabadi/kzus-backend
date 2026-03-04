export const dbConnection = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log(`PostgreSQL DB connected.`);
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync();
            console.log(`PostgreSQL DB synced.`);
        }
    } catch (error) {
        console.error(`Error connecting to PostgreSQL DB: ${error}`);
    }
}