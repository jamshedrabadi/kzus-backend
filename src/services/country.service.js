import { db } from "../db/db-connection.js";
import { country } from "../db/schema/country.schema.js";

export const getCountryListFromDb = async () => {
    try {
        const result = await db
            .select({
                country_id: country.id,
                country_name: country.name,
                country_code: country.code,
            })
            .from(country)
            .orderBy(country.name);

        return result;
    } catch (error) {
        console.error("Error in getCountryListFromDb: ", error);
        throw error;
    }
};
