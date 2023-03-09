const { generateJWTToken, generateRefreshToken, verifyToken } = require('../../src/util/jwtUtil');
const jwt = require('jsonwebtoken');

describe('JWT Util', () => {
  it('should generate a JWT token', () => {
    const token = generateJWTToken({ id: 1, email: 'khushil' });
    expect(token).toBeDefined();
  });
  it('should generate a refresh token', () => {
    const token = generateRefreshToken(1);
    expect(token).toBeDefined();
  });
  it('should verify a token', async () => {
    const token = await verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraHVzaGlsIiwiaWF0IjoxNjc4MzM3MDYwLCJleHAiOjE2NzgzNDA2NjB9.1tXZvNOpXG2mobq1Gr2tDsVj4_b3FGKBtbk8FwqLHzA');

    expect(token).toBeDefined();
  });
});