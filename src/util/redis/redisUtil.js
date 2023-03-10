
const HttpError = require('../errors/httpError');
const { client } = require('./redis');

const saveTokenInRedis = async (token) => {
  console.log(token);
  await client.set(token, 'token', 'EX', 3600);
};

const verifyToken = async (token) => {
  const data = await client.get(token);
  console.log(data);
  if (data === null) throw new HttpError(498, 'Invalid Token');
  return true;
};
module.exports = { saveTokenInRedis, verifyToken };
