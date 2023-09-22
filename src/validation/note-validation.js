import Joi from 'joi';

const createNoteValidation = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(100).optional(),
});

const getNoteValidation = Joi.string().max(100).required();

const updateNoteValidation = Joi.object({
  id_note: Joi.string().max(100).required(),
  title: Joi.string().max(100).required(),
  description: Joi.string().max(100).optional(),
});

export { createNoteValidation, getNoteValidation, updateNoteValidation };
