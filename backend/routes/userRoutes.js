import express from 'express';
import { registerUser, signInUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signInUser);

export default router;
