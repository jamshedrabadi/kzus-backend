import {
    formatValidationError,
    responseSuccess,
    responseNotFoundError,
    responseError,
    responseValidationError,
    responseDuplicateError,
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
    getExistingMapImageCount,
    upsertMapImage,
} from "../services/map_image.service.js";
import {
    MAP_IMAGE_UPLOAD_SUCCESS_MESSAGE,
    MAP_IMAGE_CONTENT_TYPE,
    MAP_IMAGE_EXISTING_ID_NOT_FOUND_MESSAGE,
    MAP_IMAGE_MAX_LIMIT_REACHED_MESSAGE,
    MAP_IMAGE_MAX_LIMIT,
} from "../constants/map_image.constants.js";
import {
    RESPONSE_CODE_CREATED,
} from "../constants/http.constants.js";
import {
    BASE_URL,
} from "../constants/r2.constants.js";

export const uploadMapImage = async (request, response) => {
    try {
        const mapImageData = request.body;
        const mapImageFile = request.file;

        let oldKey = null;

        const validateRequest = uploadMapImageSchema.validate(mapImageData);
        if (validateRequest.error) {
            return responseValidationError(
                response,
                validateRequest.error,
            );
        }

        const validateFileResponse = await validateFile(mapImageFile);
        if (validateFileResponse) {
            throw (formatValidationError(validateFileResponse)); // validation error format
        }

        const mappedMapImageData = mapUploadMapImageRequest(mapImageData);

        if (mappedMapImageData.image_id) {
            // edit map image - check for existing id to be replaced
            const existingMapImage = await getExistingMapImage(mappedMapImageData.image_id);
            if (!existingMapImage) {
                return responseNotFoundError(
                    response,
                    MAP_IMAGE_EXISTING_ID_NOT_FOUND_MESSAGE,
                );
            }

            oldKey = existingMapImage.image_key;
        } else {
            // insert map image - check for max images per map
            const existingMapImageCount = await getExistingMapImageCount(mappedMapImageData.map_id);
            if (existingMapImageCount > MAP_IMAGE_MAX_LIMIT) {
                return responseDuplicateError(
                    response,
                    MAP_IMAGE_MAX_LIMIT_REACHED_MESSAGE,
                );
            }
        }

        const convertedMapImageBuffer = await convertFileTypeAndResize(mapImageFile);

        const newKey = getNewFileKey(mappedMapImageData);

        await uploadToR2(convertedMapImageBuffer, newKey, MAP_IMAGE_CONTENT_TYPE); // upload new

        const upsertMapImageResponse = await upsertMapImage(mappedMapImageData, newKey);

        if (oldKey) { // delete old image from r2
            await deleteFromR2(oldKey);
        }

        const mapImageResponse = {
            mapImageId: upsertMapImageResponse.mapImageResponse,
            mapImageUrl: `${BASE_URL}/${newKey}`,
        };

        return responseSuccess(
            response,
            RESPONSE_CODE_CREATED,
            MAP_IMAGE_UPLOAD_SUCCESS_MESSAGE,
            mapImageResponse,
        );
    } catch (error) {
        console.error("Error in uploadMapImage: ", error);

        return responseError(
            response,
            error.message,
        );
    }
};
