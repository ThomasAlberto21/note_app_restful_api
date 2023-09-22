import express from 'express';
import userController from '../controller/user-controller.js';
import noteController from '../controller/note-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/user', userController.getUser);
userRouter.patch('/api/user', userController.updateUser);
userRouter.delete('/api/user/logout', userController.logoutUser);

// Note API
userRouter.post('/notes', noteController.createNote);
userRouter.get('/notes/:noteId', noteController.getNote);
userRouter.put('/notes/:noteId', noteController.updateNote);
userRouter.delete('/notes/:noteId', noteController.removeNote);

export { userRouter };
