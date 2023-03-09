//write jest test for auth controller 
const authServices = require('../../src/services/authService.js');
const HttpError = require('../../src/util/errors/httpError');
const { user } = require('../../database/models');
const passUtil = require('../../src/util/passwordUtil');
const redisUtils = require('../../src/util/redis/redisUtil');
const jwtUtil = require('../../src/util/jwtUtil');
const { UniqueConstraintError } = require('sequelize');

const mockBody = {
  email: 'khushil',
  password: '123456',
};


const mockUser = {
  "id": 4,
  "email": "khushil2",
  "updatedAt": "2023-03-08T15:21:25.073Z",
  "createdAt": "2023-03-08T15:21:25.073Z",
  dataValues: {
    "id": 4,
    "email": "khushil2",
    "updatedAt": "2023-03-08T15:21:25.073Z",
    "createdAt": "2023-03-08T15:21:25.073Z",
    "password": "something"
  }
}

const mockDecoded = {
  "id": 1,
  "email": "khushil",
  "iat": 1678287947,
  "exp": 1678291547
}

describe('Auth services', () => {
  describe('create user service', () => {
    it('should create a user', async () => {
      jest.spyOn(passUtil, 'generateHashPassword').mockResolvedValue('password');
      jest.spyOn(user, 'create').mockResolvedValue(mockUser);
      const userData = await authServices.createUser(mockUser.email, "password");
      expect(userData).toEqual(mockUser);
    });
    it('should throw an error', async () => {
      jest.spyOn(passUtil, 'generateHashPassword').mockResolvedValue('password');
      jest.spyOn(user, 'create').mockRejectedValue(null);
      expect(async () => { await authServices.createUser(mockUser.email, "password") }).rejects.toThrow('Internal Server Error');
    });
    it('should throw user already exist error', async () => {
      jest.spyOn(passUtil, 'generateHashPassword').mockResolvedValue('password');
      jest.spyOn(user, 'create').mockRejectedValue(new UniqueConstraintError());
      expect(async () => { await authServices.createUser(mockUser.email, "password") }).rejects.toThrow('email already exists');
    });
  });
  describe('login service', () => {
    it('should login a user', async () => {
      jest.spyOn(passUtil, 'verifyPassword').mockResolvedValue(true);
      jest.spyOn(redisUtils, 'saveTokenInRedis').mockResolvedValue(true);
      jest.spyOn(jwtUtil, 'generateJWTToken').mockResolvedValue('token');
      jest.spyOn(user, 'findOne').mockResolvedValue(mockUser);
      const userData = await authServices.login(mockUser.email, "password");
      expect(userData).toEqual('token');
    });
    it('should throw an error', async () => {
      jest.spyOn(passUtil, 'verifyPassword').mockResolvedValue(true);
      jest.spyOn(user, 'findOne').mockRejectedValue(new Error('Internal Server Error'));
      jest.spyOn(redisUtils, 'saveTokenInRedis').mockResolvedValue(true);
      expect(async () => { await authServices.login(mockUser.email, "password") }).rejects.toThrow('Internal Server Error');
    });

  });
  describe('validate token service', () => {
    it('should validate a token', async () => {
      jest.spyOn(redisUtils, 'verifyToken').mockResolvedValue(true);
      jest.spyOn(jwtUtil, 'verifyToken').mockResolvedValue(mockDecoded);
      const userData = await authServices.validateToken('token');
      expect(userData).toEqual(mockDecoded);
    });
    it('should throw an error', async () => {
      jest.spyOn(redisUtils, 'verifyToken').mockResolvedValue(true);
      jest.spyOn(jwtUtil, 'verifyToken').mockRejectedValue(new HttpError(498, 'Invalid Token'));
      // const userData = await authServices.validateToken('token');
      expect(async () => { const data = await authServices.validateToken('token') }).rejects.toThrow('Invalid Token');
    });
  });
});