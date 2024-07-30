import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if req.user is defined
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    // Ensure req.user.roles is defined and is an array
    const userRoles = req.user.roles?.map((role: any) => role.name) || [];

    if (!roles.some(role => userRoles.includes(role))) {
      return res.status(403).json({ message: 'Forbidden.' });
    }

    next();
  };
};
