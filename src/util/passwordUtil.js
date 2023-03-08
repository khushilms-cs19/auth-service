const bcrypt = require('bcrypt');
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const generateHashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(SALT_ROUNDS), (error, hashedPass) => {
      if (error) reject(error);
      resolve(hashedPass);
    });
  });
};

const verifyPassword = (password, passwordStoredInDB) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordStoredInDB, (error, verified) => {
      if (error) reject(error);
      resolve(verified);
    });
  });
};

module.exports = { generateHashPassword, verifyPassword };
