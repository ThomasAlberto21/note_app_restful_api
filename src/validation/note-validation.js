import Joi from 'joi';

const createNoteValidation = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(100).optional(),
});

const getNoteValidation = Joi.string().max(100).required();

export { createNoteValidation, getNoteValidation };
