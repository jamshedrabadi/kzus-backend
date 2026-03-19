import {
    COUNTRY_FLAG_URL,
    COUNTRY_FLAG_EXTENSION,
} from "../constants/country.constants.js";

export const mapGetCountryListResponse = (countryData) => {
    const mappedPlayerData = countryData.map((country) => {
        return {
            countryId: country.country_id,
            countryName: country.country_name,
            countryCode: country.country_code,
            countryFlag: `${COUNTRY_FLAG_URL}${country.country_code}${COUNTRY_FLAG_EXTENSION}`,

        };
    });

    return mappedPlayerData;
};
