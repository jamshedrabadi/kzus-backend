import {
    responseSender,
} from "../utils/response.utils.js";
import {
    uploadMapImageSchema,
} from "../validators/map_image.validator.js";
import {
    validateFile,
} from "../file_helpers/map_image.file_helper.js";
import {
    MAP_IMAGE_MODULE,
    MAP_IMAGE_UPLOAD_SUCCESS_MESSAGE,
    MAP_IMAGE_UPLOAD_FAILURE_MESSAGE,
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
        const mapImageFile = request.mapImage;

        await uploadMapImageSchema.validateAsync(mapImageData);

        const validateFileResponse = validateFile(mapImageFile);
        if (validateFileResponse) {
            throw({ details: [{ message: validateFileResponse }] });
        }

        // TODO: file validation

        // TODO: file upload

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = MAP_IMAGE_UPLOAD_SUCCESS_MESSAGE;
        responseData.data = { mapImageId: "done" }; // TODO

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in uploadMapImage: ", error);

        responseData.error = error;
        responseData.message = MAP_IMAGE_UPLOAD_FAILURE_MESSAGE;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};