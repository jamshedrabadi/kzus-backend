import { createMapRecord } from "../services/map.service.js";

export const createMap = async (request, response) => {
    try {
        // validation
        const mapData = request.body;
        await createMapRecord(mapData);

        response.status(200).send({ message: 'Map created.' });
    } catch (error) {
        console.error("Error in createMap: ", error);
        response.status(409).send({ message: "Map not created.", errorMessage: error });
    }
}
