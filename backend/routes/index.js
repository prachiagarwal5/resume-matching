const express = require("express");
const router = express.Router();
const authRoutes = require("./auth"); // Import the correct auth route
const analyzeRoutes = require("./analyzeRoutes");
const formRoutes = require("./formRoutes");
const commRoutes = require("./commRoutes");

router.use("/auth", authRoutes); // Use the auth routes under "/auth"
router.use("/analyze", analyzeRoutes);
router.use("/form", formRoutes);
router.use("/communication", commRoutes);

module.exports = router; // Export the main router
