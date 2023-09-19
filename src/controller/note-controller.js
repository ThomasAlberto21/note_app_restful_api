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

export default {
  createNote,
}