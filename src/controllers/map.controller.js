import {
    createMapInDb,
    updateMapInDb,
    getMapDataFromDb,
    getMapStatsFromDb,
    getMapWorldRecordsFromDb,
    getMapImagesFromDb,
    getMapListFromDb,
    checkExistingMapName,
} from "../services/map.service.js";
import {
    formatValidationErrorResponse,
    responseError,
    responseSuccess,
} from "../utils/response.utils.js";
import {
    createOrUpdateMapSchema,
} from "../validators/map.validator.js";
import {
    mapCreateOrUpdateMapRequest,
    mapGetMapResponse,
    mapGetMapListResponse,
} from "../mappers/map.mapper.js";
import {
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_CREATED,
    VALIDATION_ERROR,
    CONFLICT_ERROR,
    NOT_FOUND_ERROR,
    INTERNAL_SERVER_ERROR,
} from "../constants/response.constants.js";
import {
    MAP_CREATION_SUCCESS_MESSAGE,
    MAP_UPDATION_SUCCESS_MESSAGE,
    MAP_FOUND_MESSAGE,
    MAP_NOT_FOUND_MESSAGE,
    MAP_LIST_FOUND_MESSAGE,
    MAP_LIST_NOT_FOUND_MESSAGE,
    DUPLICATE_MAP_NAME_MESSAGE,
} from "../constants/map.constants.js";

export const createMap = async (request, response) => {
    try {
        const mapData = request.body;

        const validateRequest = createOrUpdateMapSchema.validate(mapData);
        if (validateRequest.error) {
            return responseError(
                VALIDATION_ERROR,
                response,
                formatValidationErrorResponse(validateRequest.error),
            );
        }

        const mappedMapData = mapCreateOrUpdateMapRequest(mapData);

        const existingMap = await checkExistingMapName(mappedMapData);
        if (existingMap > 0) {
            return responseError(
                CONFLICT_ERROR,
                response,
                [DUPLICATE_MAP_NAME_MESSAGE],
            );
        }

        const createMapResponse = await createMapInDb(mappedMapData);

        return responseSuccess(
            response,
            RESPONSE_CODE_CREATED,
            MAP_CREATION_SUCCESS_MESSAGE,
            { mapId: createMapResponse },
        );
    } catch (error) {
        console.error("Error in createMap: ", error);

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
    }
};

export const updateMap = async (request, response) => {
    try {
        const mapId = request.params.id;
        const mapData = request.body;

        const validateRequest = createOrUpdateMapSchema.validate(mapData);
        if (validateRequest.error) {
            return responseError(
                VALIDATION_ERROR,
                response,
                formatValidationErrorResponse(validateRequest.error),
            );
        }

        const mappedMapData = mapCreateOrUpdateMapRequest(mapData);

        const existingMap = await checkExistingMapName(mappedMapData, mapId);
        if (existingMap > 0) {
            return responseError(
                CONFLICT_ERROR,
                response,
                [DUPLICATE_MAP_NAME_MESSAGE],
            );
        }

        const updateMapResponse = await updateMapInDb(mapId, mappedMapData);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            MAP_UPDATION_SUCCESS_MESSAGE,
            { mapId: updateMapResponse },
        );
    } catch (error) {
        console.error("Error in updateMap: ", error);

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
    }
};

export const getMapData = async (request, response) => {
    try {
        const mapId = request.params.id;

        const [mapResponse, mapStatsResponse, mapWorldRecordsResponse, mapImagesResponse] =
            await Promise.all([
                getMapDataFromDb(mapId),
                getMapStatsFromDb(mapId),
                getMapWorldRecordsFromDb(mapId),
                getMapImagesFromDb(mapId),
            ]);
        if (!mapResponse.length) {
            return responseError(
                NOT_FOUND_ERROR,
                response,
                [MAP_NOT_FOUND_MESSAGE],
            );
        }

        const mappedMapResponse = mapGetMapResponse(
            mapResponse, mapStatsResponse, mapWorldRecordsResponse, mapImagesResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            MAP_FOUND_MESSAGE,
            mappedMapResponse,
        );
    } catch (error) {
        console.error("Error in getMapData: ", error);

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
    }
};

export const getMapList = async (request, response) => {
    try {
        const mapListResponse = await getMapListFromDb();
        if (!mapListResponse.length) {
            return responseError(
                NOT_FOUND_ERROR,
                response,
                [MAP_LIST_NOT_FOUND_MESSAGE],
            );
        }

        const mappedMapListResponse = mapGetMapListResponse(mapListResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            MAP_LIST_FOUND_MESSAGE,
            mappedMapListResponse,
        );
    } catch (error) {
        console.error("Error in getMapList: ", error);

        return responseError(
            INTERNAL_SERVER_ERROR,
            response,
            [error.message],
        );
    }
};
