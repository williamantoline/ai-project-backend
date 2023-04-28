const express = require('express');
const router = express.Router();

const { getUser } = require('../middleware/authMid');
const rankController = require('../controller/rankController')

router.get('/leaderboard', rankController.getLeaderBoards);

module.exports = router;