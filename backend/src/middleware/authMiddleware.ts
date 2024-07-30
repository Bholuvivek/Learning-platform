import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IUser } from '../models/User'; // Import IUser type

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, async (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token.' });
    }

    const user = await User.findById(decoded.id).populate('roles') as IUser | null;

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user; // Assign user to req.user
    next();
  });
};
