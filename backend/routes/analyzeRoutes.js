const express = require('express');
const { analyzeResumeController } = require('../controllers/analyzeController');
const router = express.Router();

// POST route for resume analysis
router.post('/', analyzeResumeController);

module.exports = router;
