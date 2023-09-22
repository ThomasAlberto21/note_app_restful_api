import noteService from '../service/note-service.js';

const createNote = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await noteService.createNote(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getNote = async (req, res, next) => {
  try {
    const user = req.user;
    const { noteId } = req.params;
    const result = await noteService.getNote(user, noteId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const user = req.user;
    const { noteId } = req.params;
    const request = req.body;
    request.id_note = noteId;

    const result = await noteService.updateNote(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const removeNote = async (req, res, next) => {
  try {
    const user = req.user;
    const { noteId } = req.params;

    await noteService.removeNote(user, noteId);
    res.status(200).json({
      data: 'Note successfully deleted',
    });
  } catch (e) {
    next(e);
  }
};

const searchNote = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.query;
    const result = await noteService.searchNote(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createNote,
  getNote,
  updateNote,
  removeNote,
  searchNote,
};
