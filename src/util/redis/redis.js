const { createClient } = require('redis');

/**
 * @description Create a redis client
 * @returns {RedisClient}
 */
const config = {
  socket: {
    host: 'localhost',
    // port: 6379,
  }
};
const client = createClient(config);

module.exports = { client };
