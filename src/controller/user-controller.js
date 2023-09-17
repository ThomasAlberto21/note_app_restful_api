import userService from '../service/user-service.js';

const registerUser = async (req, res, next) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  registerUser,
  loginUser
};
