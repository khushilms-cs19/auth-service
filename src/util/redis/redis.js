const { createClient } = require('redis');

require('dotenv').config();

/**
 * @description Create a redis client
 * @returns {RedisClient}
 */
const config = {
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    // port: 6379,
  }
};
const client = createClient(config);

module.exports = { client };
