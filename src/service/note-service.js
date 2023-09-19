import { v4 as uuid } from 'uuid';
import { validate } from '../validation/validation.js';
import { prismaClient } from '../application/database.js';
import { createNoteValidation } from '../validation/note-validation.js';

const createNote = (user, request) => {
  const note = validate(createNoteValidation, request);
  note.id_user = user.id_user;

  const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Jakarta',
  });
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

export default {
  createNote,
};
