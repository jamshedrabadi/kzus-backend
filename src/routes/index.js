import difficultyRoutes from "./difficulty.routes.js";
import lengthRoutes from "./length.routes.js";
import typeRoutes from "./type.routes.js";
import countryRoutes from "./country.routes.js";
import playerRoutes from "./player.routes.js";
import mapRoutes from "./map.routes.js";
import recordRoutes from "./record.routes.js";
import serverRoutes from "./server.routes.js";
import mapImageRoutes from "./map_image.routes.js";

export const importRoutes = (app) => {
    app.get("/health", (request, response) => response.status(200).send({ message: "working" }));

    app.use("/difficulty", difficultyRoutes);
    app.use("/length", lengthRoutes);
    app.use("/type", typeRoutes);
    app.use("/country", countryRoutes);
    app.use("/player", playerRoutes);
    app.use("/map", mapRoutes);
    app.use("/record", recordRoutes);
    app.use("/server", serverRoutes);
    app.use("/map-image", mapImageRoutes);
};
