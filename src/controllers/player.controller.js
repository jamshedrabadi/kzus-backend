import { createPlayerRecord } from "../services/player.service.js";
import { responseSender } from "../utils/response.utils.js";
import {
    RESPONSE_CODE_CREATED,
} from "../constants/http.constants.js";
import {
    PLAYER_MODULE,
    PLAYER_CREATION_SUCCESS_MESSAGE,
} from "../constants/player.constants.js";

export const createPlayer = async (request, response) => {
    const responseData = { status: false, statusCode: 0, message: "", error: null, module: "" };

    try {
        // validation here

        const playerData = request.body;
        await createPlayerRecord(playerData);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_CREATED;
        responseData.message = PLAYER_CREATION_SUCCESS_MESSAGE;
    } catch (error) {
        console.error("Error in createPlayer: ", error);

        responseData.error = error;
        responseData.module = PLAYER_MODULE;
    }

    return responseSender(response, responseData.status, responseData.statusCode,
        responseData.message, responseData.error, responseData.module);
}
