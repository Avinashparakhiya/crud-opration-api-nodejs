const joi = require('joi');

const schema123 = {
  user: joi.object({
    name: joi.string().max(15).required(),
    age: joi.number().max(3).required(),
    mobileno: joi.number().required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  }),
};
module.exports = schema123;
