const express = require("express");
const { createResume, uploadResume } = require("../controllers/createResume");
const upload = require("../middleware/upload");
const router = express.Router();

// POST route for form data handling
router.post("/submit", createResume);
router.post("/upload-resume", upload.single("resume"), uploadResume);

module.exports = router;
