const Joi = require('joi');


const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required()
});


const loginSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().min(6).max(20).required()
});

module.exports = {
  registerSchema,
  loginSchema
};