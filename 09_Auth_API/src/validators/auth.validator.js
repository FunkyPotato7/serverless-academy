const Joi = require('joi');

const { EMAIL, PASSWORD } = require('../enums/regexp.enum');

module.exports = Joi.object({
    email: Joi.string().regex(EMAIL).trim().lowercase().required(),
    password: Joi.string().regex(PASSWORD).trim().required()
});