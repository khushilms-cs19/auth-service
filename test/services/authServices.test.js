//write jest test for auth controller 
const authServices = require('../../src/services/authService');
const HttpError = require('../../src/util/errors/httpError');
const db = require('../../database/models/index');
const passUtil = require('../../src/util/passwordUtil');
const mockBody = {
  username: 'khushil',
  password: '123456',
};

const mockRequest = {
  body: mockBody,
  token: 'token',
};
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const userModel = {
  create: jest.fn(),
  findOne: jest.fn(),
}

const mockUser = {
  "id": 4,
  "username": "khushil2",
  "updatedAt": "2023-03-08T15:21:25.073Z",
  "createdAt": "2023-03-08T15:21:25.073Z"
}

describe('Auth services', () => {
  describe('create user service', () => {
    it('should create a user', async () => {
      jest.spyOn(passUtil, 'generateHashPassword').mockResolvedValue('password');
      jest.spyOn(db.user, 'create').mockResolvedValue(mockUser);
      const userData = await authServices.createUser(mockUser.username, "password");
      expect(userData).toEqual(mockUser);
    });
    it('should throw an error', async () => {
      jest.spyOn(passUtil, 'generateHashPassword').mockResolvedValue('password');
      jest.spyOn(db.user, 'create').mockRejectedValue(new Error('Internal Server Error'));
      const userData = await authServices.createUser(mockUser.username, "password");
      expect(async () => await authServices.createUser(mockUser.username, "password")).toThrow('Internal Server Error');
    });
  });
});