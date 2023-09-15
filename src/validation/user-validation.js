import Joi from 'joi';

const registerUserValidation = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  password: Joi.string().min(10).max(100).required(),
});

export { registerUserValidation };
