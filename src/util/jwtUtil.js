const jwt = require('jsonwebtoken');
const EXPRIRE_TIME = 3600;
const HASH = process.env.HASH || 'SUPERSECRET';

const generateJWTToken = ({ id, email }) => {
  const payload = {
    userId: id,
    email
  };
  const token = jwt.sign(payload, HASH, {
    expiresIn: EXPRIRE_TIME
  });
  return token;
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, HASH, (error, decoded) => {
      if (error) reject(error);
      if (!decoded) reject(error);
      resolve(decoded);
    });
  });
};

const generateRefreshToken = (id) => {
  const payload = {
    id,
    refresh: true
  };
  const token = jwt.sign(payload, HASH, { expiresIn: '7d' });
  return token;
};

module.exports = { generateJWTToken, verifyToken, generateRefreshToken };
