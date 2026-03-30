import {
    responseSender,
} from "../utils/response.utils.js";
import {
    uploadMapImageSchema,
} from "../validators/map_image.validator.js";
import {
    MAP_IMAGE_MODULE,
} from "../constants/map_image.constants.js";
import {
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";

export const uploadMapImage = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: MAP_IMAGE_MODULE,
    };

    try {
        const mapImageData = request.body;

        await uploadMapImageSchema.validateAsync(mapImageData);

        // TODO: file validation

        // TODO: file upload

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = "suc"; // TODO
        responseData.data = { mapImageId: "done" }; // TODO

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in updateHeartbeat: ", error);

        responseData.error = error;
        responseData.message = "fai"; // TODO

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};