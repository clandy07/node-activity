const Joi = require('joi');

 // Schema for validating user registration input
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(), // Username must be alphanumeric, 3-30 characters
  email: Joi.string().email().required(), // Email must be a valid email format and is required
  password: Joi.string().min(6).max(20).required() // Password must be 6-20 characters and is required
});


// Schema for validating user login input
const loginSchema = Joi.object({
  username: Joi.string().alphanum().required(), // Username must be alphanumeric and is required
  password: Joi.string().min(6).max(20).required() // Password must be 6-20 characters and is required
});

module.exports = {
  registerSchema,
  loginSchema
};