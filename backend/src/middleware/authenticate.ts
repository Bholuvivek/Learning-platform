import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).populate('roles');

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    req.user = user; // Attach user to the request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized.' });
  }
};
