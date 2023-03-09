const passUtil = require('../util/passwordUtil');
const jwtUtil = require('../util/jwtUtil');
const db = require('../../database/models');
const HttpError = require('../util/errors/httpError');
const { UniqueConstraintError } = require('sequelize');
const redisUtil = require('../util/redis/redisUtil');
const createUser = async (email, password) => {
  try {
    const hashedPassword = await passUtil.generateHashPassword(password);
    const userData = await db.user.create({
      email,
      password: hashedPassword
    });
    delete userData.dataValues.password;
    return userData;
  } catch (error) {
    console.log(error);
    if (error instanceof UniqueConstraintError) {
      throw new HttpError(400, 'email already exists');
    }
    throw new HttpError(500, 'Internal Server Error');
  }
};

const login = async (email, password) => {
  const userFound = await db.user.findOne({
    where: {
      email
    }
  });
  if (!userFound) { throw new HttpError(401, 'Invalid email'); }
  const userData = userFound.dataValues;
  const userIsValid = await passUtil.verifyPassword(password, userData.password);
  if (!userIsValid) { throw new HttpError(401, 'Wrong Password'); }
  const token = jwtUtil.generateJWTToken(userData);
  await redisUtil.saveTokenInRedis(token);
  return token;
};

const validateToken = async (token) => {
  try {
    token = token.replace('Bearer ', '');
    await redisUtil.verifyToken(token);
    const validToken = await jwtUtil.verifyToken(token);
    return validToken;
  } catch (error) {
    throw new HttpError(498, 'Invalid Token');
  }
};

module.exports = { createUser, login, validateToken };
