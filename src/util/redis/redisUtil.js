
const HttpError = require('../errors/httpError');
const { client } = require('./redis');

const saveTokenInRedis = async (token) => {
  await client.set(token, '', 'EX', 3600);
};

const verifyToken = async (token) => {
  const data = await client.get(token);
  if (data === null) throw new HttpError(498, 'Invalid Token');
  return true;
};
module.exports = { saveTokenInRedis, verifyToken };
