// const express = require('express');
// const { analyzeResumeController } = require('../controllers/analyzeController');
// const router = express.Router();

// // POST route for resume analysis
// router.post('/', analyzeResumeController);

// module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  analyzeSingleResume,
  analyzeMultipleResumes,
} = require("../controllers/analyzeController");

// Single file upload route
router.post("/", upload.single("resume"), analyzeSingleResume);

// Multiple files upload route
router.post("/multiple", upload.array("resumes", 20), analyzeMultipleResumes);

module.exports = router;
