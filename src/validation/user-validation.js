import Joi from 'joi';

const registerUserValidation = Joi.object({
  name: Joi.string().max(100).required(),
  password: Joi.string().min(10).max(100).required(),
});

const loginUserValidation = Joi.object({
  name: Joi.string().max(100).required(),
  password: Joi.string().min(10).max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

export { registerUserValidation, loginUserValidation , getUserValidation };
