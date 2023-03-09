// import { expect, it, jest, describe } from '@jest/globals'

const { client } = require('../../src/util/redis/redis');
const HttpError = require('../../src/util/errors/httpError');
const { saveTokenInRedis, verifyToken } = require('../../src/util/redis/redisUtil');
describe('Tests for Redis Util', () => {
  it('should save the token in redis', async () => {
    jest.spyOn(client, 'set').mockResolvedValue(true)
    const res = await saveTokenInRedis('token')
    expect(res).toBe(undefined)
  })
  it('should throw an error when the token is not saved', async () => {
    jest.spyOn(client, 'get').mockResolvedValue(null)
    try {
      await verifyToken('token')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError)
    }
  })
  it('should verify the token', async () => {
    jest.spyOn(client, 'get').mockResolvedValue('token')
    const res = await verifyToken('token')
    expect(res).toEqual(true)
  })
})