const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlwares');

router.post('/sign-up', authMiddleware.checkSignUpBody, authController.signUp);

router.post('/sign-in', authMiddleware.checkSignInBody, authController.signIn);

module.exports = router;