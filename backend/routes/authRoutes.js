const express = require("express");
const router = express.Router();
const { register, login, authenticate } = require("../controllers/authController");

// User registration route
router.post("/register", register);
// User login route
router.post("/login", login);
// Authentication middleware
router.use(authenticate);

// Export the router
module.exports = router;
