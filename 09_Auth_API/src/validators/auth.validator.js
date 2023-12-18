import Joi from  'joi';

import { EMAIL, PASSWORD } from  '../enums/regexp.enum.js';

const authValidator = Joi.object({
    email: Joi.string().regex(EMAIL).trim().lowercase().required(),
    password: Joi.string().regex(PASSWORD).trim().required()
});

export {
    authValidator,
};