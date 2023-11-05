const router = require('express').Router();

const { userController } = require('../controllers');
const { authMiddleware } = require('../middlwares');

router.get('/', authMiddleware.checkAccessToken, userController.getOneById);

module.exports = router;