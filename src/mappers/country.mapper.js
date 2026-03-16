import {
    COUNTRY_FLAG_DIMENSION,
} from "../constants/country.constants.js";

export const mapGetCountryListResponse = (countryData) => {
    const mappedPlayerData = countryData.map((country) => {
        return {
            countryId: country.country_id,
            countryName: country.country_name,
            countryCode: country.country_code,
            countryFlag:
                `https://flagcdn.com/${COUNTRY_FLAG_DIMENSION}/${country.country_code}.png`,

        };
    });

    return mappedPlayerData;
};
