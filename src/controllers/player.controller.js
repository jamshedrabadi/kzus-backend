import { createPlayerRecord } from "../services/player.service.js";

export const getPlayerData = async (request, response) => {
    response.status(200).send({ name: 'tempname' });
}

export const createPlayer = async (request, response) => {
    try {
        // validation
        const playerData = request.body;
        await createPlayerRecord(playerData);

        response.status(200).send({ message: 'Player created.' });
    } catch (error) {
        console.error("Error in createPlayer: ", error);
        response.status(409).send({ message: "Player not created.", errorMessage: error });
    }
}
