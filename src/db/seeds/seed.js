import "dotenv/config";

import { seedDifficulty } from "./difficulty.seed.js";
import { seedLength } from "./length.seed.js";
import { seedType } from "./type.seed.js";
import { seedCountry } from "./country.seed.js";

export const seed = async () => {
    await seedDifficulty();
    await seedLength();
    await seedType();
    await seedCountry();
};

await seed();

process.exit(0);
