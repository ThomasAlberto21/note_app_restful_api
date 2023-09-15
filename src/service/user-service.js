import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { validate } from '../validation/validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { registerUserValidation } from '../validation/user-validation.js';

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

export default {
  registerUser,
};
