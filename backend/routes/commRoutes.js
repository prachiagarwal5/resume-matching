const express = require('express');
const router = express.Router();
const commController = require('../controllers/commController');

router.post('/comm', commController);

module.exports = router;