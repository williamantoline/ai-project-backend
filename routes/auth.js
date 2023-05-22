const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const { validateUser } = require('../middleware/userValidator');

router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);
router.get('/auth', authController.auth);

module.exports = router;