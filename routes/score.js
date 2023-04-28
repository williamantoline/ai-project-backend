const express = require('express');
const router = express.Router();

const scoreController = require('../controller/scoreController');

router.put('/score', scoreController.updateScore);

module.exports = router;