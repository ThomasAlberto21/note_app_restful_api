import Joi from 'joi';

const registerUserValidation = Joi.object({
  name: Joi.string().max(100).required(),
  password: Joi.string().min(10).max(100).required(),
});

const loginUserValidation = Joi.object({
  name: Joi.string().max(100).required(),
  password: Joi.string().min(10).max(100).required(),
});

const updateUserValidation = Joi.object({
  id_user: Joi.string().max(100).required(),
  name: Joi.string().max(100).optional(),
  password: Joi.string().max(100).optional(),
});

const getUserValidation = Joi.string().max(100).required();

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
};
