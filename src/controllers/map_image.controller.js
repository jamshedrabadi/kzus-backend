import {
    responseSender,
    formatValidationError,
} from "../utils/response.utils.js";
import {
    uploadMapImageSchema,
} from "../validators/map_image.validator.js";
import {
    validateFile,
    convertFileTypeAndResize,
    getNewFileKey,
} from "../file_helpers/map_image.file_helper.js";
import {
    uploadToR2,
} from "../services/r2.service.js";
import {
    mapUploadMapImageRequest,
} from "../mappers/map_image.mapper.js";
import {
    MAP_IMAGE_MODULE,
    MAP_IMAGE_UPLOAD_SUCCESS_MESSAGE,
    MAP_IMAGE_UPLOAD_FAILURE_MESSAGE,
    MAP_IMAGE_CONTENT_TYPE,
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
        const mapImageFile = request.file;

        await uploadMapImageSchema.validateAsync(mapImageData);

        const validateFileResponse = await validateFile(mapImageFile);
        if (validateFileResponse) {
            throw (formatValidationError(validateFileResponse)); // validation error format
        }

        const mappedMapImageData = mapUploadMapImageRequest(mapImageData);

        const convertedMapImageBuffer = await convertFileTypeAndResize(mapImageFile);

        const newKey = getNewFileKey(mappedMapImageData);

        const uploadResponse =
            await uploadToR2(convertedMapImageBuffer, newKey, MAP_IMAGE_CONTENT_TYPE);

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