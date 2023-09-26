import cors from 'cors';
import express from 'express';
import { userRouter } from '../router/api-router.js';
import { publicRouter } from '../router/public-router.js';
import { errorMiddleware } from '../middleware/error-middleware.js';

export const web = express();
web.use(express.json());
web.use(cors({
  origin: '*',
  credentials: true,
}));
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
