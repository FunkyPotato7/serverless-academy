import express from "express";

const router = express.Router();

import { userController } from '../controllers/index.js';
import { authMiddleware } from '../middlwares/index.js';

router.get('/', authMiddleware.checkAccessToken, userController.getOneById);

export default router;