import {
    responseSender,
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
    COUNTRY_MODULE,
} from "../constants/country.constants.js";
import {
    RESPONSE_CODE_DATA_NOT_FOUND,
    RESPONSE_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_CODE_SUCCESS,
} from "../constants/http.constants.js";
import {
    RESPONSE_MESSAGE_DATA_NOT_FOUND,
} from "../constants/common.constants.js";

export const getCountryList = async (request, response) => {
    const responseData = {
        status: false,
        statusCode: 0,
        message: "",
        data: null,
        error: null,
        module: COUNTRY_MODULE,
    };

    try {
        const countryListResponse = await getCountryListFromDb();
        if (!countryListResponse.length) {
            responseData.statusCode = RESPONSE_CODE_DATA_NOT_FOUND;
            responseData.message = COUNTRY_LIST_NOT_FOUND_MESSAGE;

            return responseSender(response, responseData.status, responseData.statusCode,
                responseData.message, responseData.data, responseData.error, responseData.module);
        }

        const mappedCountryListResponse = mapGetCountryListResponse(countryListResponse);

        responseData.status = true;
        responseData.statusCode = RESPONSE_CODE_SUCCESS;
        responseData.message = COUNTRY_LIST_FOUND_MESSAGE;
        responseData.data = mappedCountryListResponse;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    } catch (error) {
        console.error("Error in getCountryList: ", error);

        responseData.statusCode = RESPONSE_CODE_INTERNAL_SERVER_ERROR;
        responseData.message = RESPONSE_MESSAGE_DATA_NOT_FOUND;

        return responseSender(response, responseData.status, responseData.statusCode,
            responseData.message, responseData.data, responseData.error, responseData.module);
    }
};
