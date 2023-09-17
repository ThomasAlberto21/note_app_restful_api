import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { validate } from '../validation/validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from '../validation/user-validation.js';

const registerUser = async (request) => {
  const user = validate(registerUserValidation, request);
  const isUserExist = await prismaClient.user.count({
    where: {
      name: user.name,
    },
  });

  if (isUserExist === 1) {
    throw new ResponseError(400, 'Name already exist');
  }

  user.password = await bcrypt.hash(user.password, 10);
  user.id_user = uuid();
  return prismaClient.user.create({
    data: user,
    select: {
      id_user: true,
      name: true,
    },
  });
};

const loginUser = async (request) => {
  const loginRequest = validate(loginUserValidation, request);
  const [user] = await Promise.all([
    prismaClient.user.findFirst({
      where: {
        name: loginRequest.name,
      },
      select: {
        id_user: true,
        name: true,
        password: true,
      },
    }),
  ]);

  if (!user) {
    throw new ResponseError(401, 'Name or password wrong');
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, 'Name or password wrong');
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      id_user: user.id_user,
    },
    select: {
      token: true,
    },
  });
};

const getUser = async (name) => {
  name = validate(getUserValidation, name);

  const user = await prismaClient.user.findFirst({
    where: {
      name: name,
    },
    select: {
      id_user: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return user;
};

const updateUser = async (request) => {
  const user = validate(updateUserValidation, request);

  const totalInDatabase = await prismaClient.user.count({
    where: {
      id_user: user.id_user,
    },
  });

  if (!totalInDatabase) {
    throw new ResponseError(404, 'User not found');
  }

  const data = {};
  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      id_user: user.id_user,
    },
    data: data,
    select: {
      name: true,
    },
  });
};

const logoutUser = async (id_user) => {
  id_user = validate(getUserValidation, id_user);

  const user = await prismaClient.user.findUnique({
    where: {
      id_user: id_user,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return prismaClient.user.update({
    where: {
      id_user: id_user,
    },
    data: {
      token: null,
    },
    select: {
      name: true,
    },
  });
};

export default {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
};
