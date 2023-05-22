const express = require('express');
const router = express.Router();

const { getUser } = require('../middleware/authMid');
const scoreController = require('../controller/scoreController');

router.put('/score', getUser, scoreController.updateScore);

module.exports = router;