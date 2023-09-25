import { prismaClient } from '../application/database.js';

export const authMiddleware = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173/');
  const token = req.get('Authorization');
  if (!token) {
    res
      .status(401)
      .json({
        error: 'Unauthorized',
      })
      .end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!user) {
      res
        .status(401)
        .json({
          error: 'Unauthorized',
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};
