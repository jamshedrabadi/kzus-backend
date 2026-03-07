import playerRoutes from "./player.routes.js";

export const importRoutes = (app) => {
    app.get('/health', (request, response) => {
        response.status(200).send({ message: 'done' });
    });

    app.use("/player", playerRoutes);
}