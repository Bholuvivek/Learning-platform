import jwt from 'jsonwebtoken';

export const generateTokens = (user: any) => {
  const accessToken = jwt.sign({ id: user._id, roles: user.roles }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign({ id: user._id, roles: user.roles }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

  return { accessToken, refreshToken };
};
