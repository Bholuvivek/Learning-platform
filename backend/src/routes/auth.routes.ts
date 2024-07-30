import { Router } from 'express';
import { register, verifyUser, login, refreshToken } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/verify', verifyUser);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

export default router;
