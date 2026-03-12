import BaseJoi from "joi";

import { JOI_GLOBAL_OBJECT_UNKNOWN_MESSAGE } from "../constants/common.constants.js";

const Joi = BaseJoi.defaults(schema =>
    schema
        .options({
            abortEarly: false,
            allowUnknown: false,
            errors: {
                wrap: {
                    label: false,
                },
            },
        })
        .messages({
            "object.unknown": JOI_GLOBAL_OBJECT_UNKNOWN_MESSAGE,
        }),
);

export default Joi;
