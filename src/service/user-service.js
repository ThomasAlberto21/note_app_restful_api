import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { validate } from '../validation/validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import {
  loginUserValidation,
  registerUserValidation,
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
  console.log(request);
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findFirst({
    where: {
      id_user: loginRequest.id_user,
    },
    select: {
      name: true,
      password: true,
    },
  });
  console.log(user);

  if (!user) {
    throw new ResponseError(401, 'Name or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, 'Name or password is wrong');
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

export default {
  registerUser,
  loginUser,
};
