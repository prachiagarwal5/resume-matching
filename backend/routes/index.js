const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const analyzeRoutes = require("./analyzeRoutes");
const formRoutes = require("./formRoutes");
const commRoutes = require("./commRoutes");

router.use("/analyze", analyzeRoutes);
router.use("/analyze", analyzeRoutes);
router.use("/form", formRoutes);
router.use("/communication", commRoutes);

module.exports = router;
