import { v4 as uuid } from 'uuid';
import { validate } from '../validation/validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { dateFormatter } from '../utils/date-format.js';
import { createNoteValidation, getNoteValidation } from '../validation/note-validation.js';

const createNote = (user, request) => {
  const note = validate(createNoteValidation, request);
  note.id_user = user.id_user;

  note.date = dateFormatter.format(new Date());
  note.id_note = uuid();

  return prismaClient.note.create({
    data: note,
    select: {
      id_note: true,
      title: true,
      date: true,
      description: true,
    },
  });
};

const getNote = async (user, noteId) => {
  noteId = validate(getNoteValidation, noteId);

  const note = await prismaClient.note.findFirst({
    where: {
      id_user: user.id_user,
      id_note: noteId,
    },
    select: {
      id_note: true,
      title: true,
      date: true,
      description: true,
    },
  });

  if (!note) {
    throw new ResponseError(404, 'Note is not found');
  }

  return note;
};

export default {
  createNote,
  getNote,
};
