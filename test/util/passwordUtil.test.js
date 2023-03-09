// const { describe, it, expect, jest } = require('@jest/globals')
const { generateHashPassword, verifyPassword } = require('../../src/util/passwordUtil');

describe('Test for password utils', () => {
  describe('Tests for generate hash password', () => {
    it('should generate a hash password from a given value', async () => {
      const res = await generateHashPassword('123456')
      expect(res).not.toBe(null)
    })
    it('should throw an error when the password is not a valid type', async () => {
      try {
        await generateHashPassword(undefined)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe('Tests for verify password', () => {
    it('should verify a password and return true when the hashed pass is correct', async () => {
      const hashedPass = await generateHashPassword('12345')
      const res = await verifyPassword('12345', hashedPass)
      expect(res).toBe(true)
    })
    it('should verify a password and return false when the hashed pass is different from curr pass', async () => {
      const hashedPass = await generateHashPassword('12345')
      const res = await verifyPassword('12344', hashedPass)
      expect(res).toBe(false)
    })
    it('should throw an error when we pass an invalid value for hashedpass or password', async () => {
      try {
        await verifyPassword(undefined, undefined)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
})