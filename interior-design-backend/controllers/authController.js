const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Single admin — credentials from .env (no DB needed)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

     console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);
    console.log("ENV PASSWORD:", process.env.ADMIN_PASSWORD);

    console.log("REQ EMAIL:", email);
    console.log("REQ PASSWORD:", password);

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      console.log("LOGIN FAILED");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    console.log("LOGIN SUCCESS");
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );

    console.log("TOKEN GENERATED");
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { adminLogin };