//write jest test for auth controller 
const authControllers = require('../../src/controllers/authController');
const authServices = require('../../src/services/authService');
const HttpError = require('../../src/util/errors/httpError');

const mockBody = {
  email: 'khushil',
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

const mockUser = {
  "id": 4,
  "email": "khushil2",
  "updatedAt": "2023-03-08T15:21:25.073Z",
  "createdAt": "2023-03-08T15:21:25.073Z"
}

describe('Auth Controller', () => {
  describe('create user controller', () => {
    it('should create a user', async () => {
      jest.spyOn(authServices, 'createUser').mockResolvedValue(mockUser);
      await authControllers.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toBeCalledWith({
        message: 'Success',
        data: { user: mockUser },
      });
    });
    it('should throw an error', async () => {
      jest.spyOn(authServices, 'createUser').mockRejectedValue(new Error('Internal Server Error'));
      await authControllers.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should throw user already exist error', async () => {
      jest.spyOn(authServices, 'createUser').mockRejectedValue(new HttpError(400, 'email already exists'));
      await authControllers.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.json).toBeCalledWith({ message: 'email already exists' });
    });
  });
  describe('login controller', () => {
    it('should login a user', async () => {
      jest.spyOn(authServices, 'login').mockResolvedValue('token');
      await authControllers.login(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toBeCalledWith({
        message: 'Success',
        data: {
          token: 'token',
        }
      });
    });
    it('should throw an error', async () => {
      jest.spyOn(authServices, 'login').mockRejectedValue(new Error('Internal Server Error'));
      await authControllers.login(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should throw user not found error', async () => {
      jest.spyOn(authServices, 'login').mockRejectedValue(new HttpError(401, 'Invalid email'));
      await authControllers.login(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.json).toBeCalledWith({ message: 'Invalid email' });
    });
    it('should throw invalid password error', async () => {
      jest.spyOn(authServices, 'login').mockRejectedValue(new HttpError(401, 'Wrong Password'));
      await authControllers.login(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.json).toBeCalledWith({ message: 'Wrong Password' });
    });
  });
  describe('validate token controller', () => {
    it('should validate token', async () => {
      jest.spyOn(authServices, 'validateToken').mockResolvedValue('decoded');
      await authControllers.validateToken(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toBeCalledWith({
        message: 'Token is valid',
        data: 'decoded',
      });
    });
    it('should throw an error', async () => {
      jest.spyOn(authServices, 'validateToken').mockRejectedValue(new Error('Internal Server Error'));
      await authControllers.validateToken(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should throw invalid token error', async () => {
      jest.spyOn(authServices, 'validateToken').mockRejectedValue(new HttpError(498, 'Invalid Token'));
      await authControllers.validateToken(mockRequest, mockResponse);
      expect(mockResponse.status).toBeCalledWith(498);
      expect(mockResponse.json).toBeCalledWith({ message: 'Invalid Token' });
    });
  });
});