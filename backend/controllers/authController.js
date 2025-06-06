const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../db/userSchema");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Register request received:", { username, email });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password hashed successfully");

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User registered successfully:", newUser);

    // Generate token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res
      .status(201)
      .json({
        message: "User registered successfully",
        token,
        userId: newUser._id,
      });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", { email });

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log("User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      console.log("Invalid credentials for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    console.log("Token generated successfully for user:", email);

    res
      .status(200)
      .json({ result: existingUser, token, userId: existingUser._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const authenticate = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Authentication request received. Token:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found for token:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Token is valid for user:", user.email);
    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.error("Token validation error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { register, login, authenticate };
