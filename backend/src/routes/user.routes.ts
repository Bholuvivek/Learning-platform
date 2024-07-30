import { Router } from 'express';
import { updateUserProfile } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.put('/profile', authenticateToken, updateUserProfile);

export default router;
