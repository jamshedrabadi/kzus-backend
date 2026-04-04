import {
    responseError,
    responseNotFoundError,
    responseSuccess,
} from "../utils/response.utils.js";
import {
    getCountryListFromDb,
} from "../services/country.service.js";
import {
    mapGetCountryListResponse,
} from "../mappers/country.mapper.js";
import {
    COUNTRY_LIST_FOUND_MESSAGE,
    COUNTRY_LIST_NOT_FOUND_MESSAGE,
} from "../constants/country.constants.js";
import {
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
} from "../constants/common.constants.js";

export const getCountryList = async (request, response) => {
    try {
        const countryListResponse = await getCountryListFromDb();
        if (!countryListResponse.length) {
            responseNotFoundError(
                response,
                COUNTRY_LIST_NOT_FOUND_MESSAGE,
            );
        }

        const mappedCountryListResponse = mapGetCountryListResponse(countryListResponse);

        return responseSuccess(
            response,
            RESPONSE_CODE_SUCCESS,
            COUNTRY_LIST_FOUND_MESSAGE,
            mappedCountryListResponse,
        );
    } catch (error) {
        console.error("Error in getCountryList: ", error);

        responseError(response, error);
    }
};
