import jwt from 'jsonwebtoken';

const generateAccessToken = (userId: string) => {
    return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = (userId: string) => {
    return jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

export { generateAccessToken, generateRefreshToken };
