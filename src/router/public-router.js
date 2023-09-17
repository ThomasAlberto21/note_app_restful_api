import express from 'express';
import userController from '../controller/user-controller.js';

const publicRouter = new express.Router();
publicRouter.post('/api/user/register', userController.registerUser);
publicRouter.post('/api/user/login', userController.loginUser);

export { publicRouter };
