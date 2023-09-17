import express from 'express';
import userController from '../controller/user-controller.js';

const publicRouter = new express.Router();
publicRouter.post('/user/register', userController.registerUser);
publicRouter.post('/user/login', userController.loginUser);

export { publicRouter };
