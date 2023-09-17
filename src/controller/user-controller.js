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

const getUser = async (req, res, next) => {
  try {
    const name = req.user.name;
    const result = await userService.getUser(name);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id_user = req.user.id_user;
    const request = req.body;
    request.id_user = id_user;

    const result = await userService.updateUser(request);
    res.status(200).json({
      success: 'Update success',
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await userService.logoutUser(req.user.id_user);
    res.status(200).json({
      success: 'Logout success',
    });
  } catch (e) {
    next(e);
  }
};

export default {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
};
