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
    deleteFromR2,
} from "../services/r2.service.js";
import {
    mapUploadMapImageRequest,
} from "../mappers/map_image.mapper.js";
import {
    getExistingMapImage,
    upsertMapImage,
} from "../services/map_image.service.js";
import {
    MAP_IMAGE_MODULE,
    MAP_IMAGE_UPLOAD_SUCCESS_MESSAGE,
    MAP_IMAGE_UPLOAD_FAILURE_MESSAGE,
    MAP_IMAGE_CONTENT_TYPE,
    MAP_IMAGE_EXISTING_ID_NOT_FOUND,
} from "../constants/map_image.constants.js";
import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    BASE_URL,
} from "../constants/r2.constants.js";

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

        let oldKey = null;

        await uploadMapImageSchema.validateAsync(mapImageData);

        const validateFileResponse = await validateFile(mapImageFile);
        if (validateFileResponse) {
            throw (formatValidationError(validateFileResponse)); // validation error format
        }

        const mappedMapImageData = mapUploadMapImageRequest(mapImageData);

        const convertedMapImageBuffer = await convertFileTypeAndResize(mapImageFile);

        const newKey = getNewFileKey(mappedMapImageData);

        if (mappedMapImageData.image_id) { // check for existing id to be replaced
            const existingMapImage = await getExistingMapImage(mappedMapImageData.image_id);
            if (!existingMapImage) {
                responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
                responseData.message = MAP_IMAGE_EXISTING_ID_NOT_FOUND;

                return responseSender(response, responseData.status, responseData.statusCode,
                    responseData.message, responseData.data, responseData.error,
                    responseData.module);
            }

            oldKey = existingMapImage.image_key;
        }

        await uploadToR2(convertedMapImageBuffer, newKey, MAP_IMAGE_CONTENT_TYPE); // upload new

        const upsertMapImageResponse = await upsertMapImage(mappedMapImageData, newKey);

        if (oldKey) { // delete old image from r2
            await deleteFromR2(oldKey);
        }

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = MAP_IMAGE_UPLOAD_SUCCESS_MESSAGE;
        responseData.data = {
            mapImageId: upsertMapImageResponse.mapImageResponse,
            mapImageUrl: `${BASE_URL}/${newKey}`,
        };

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