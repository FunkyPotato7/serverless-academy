import express from "express";

const router = express.Router();

import { authController } from  '../controllers/index.js';
import { authMiddleware } from  '../middlwares/index.js';

router.post('/sign-up', authMiddleware.checkSignUpBody, authController.signUp);

router.post('/sign-in', authMiddleware.checkSignInBody, authController.signIn);

export default router;