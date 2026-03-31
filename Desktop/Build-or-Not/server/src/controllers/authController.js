const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const { isDBConnected } = require("../config/db");

const DEMO_LOGIN = {
  username: "user1",
  password: "password1",
  user: {
    id: "demo-user-1",
    name: "user1",
    email: "user1@buildornot.local",
  },
};

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
}

async function signup(req, res, next) {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        error: "Signup is unavailable in demo mode. Use user1 / password1 to login.",
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    return res.status(201).json({
      success: true,
      message: "Signup successful.",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email/username and password are required.",
      });
    }

    const normalizedIdentifier = email.toLowerCase().trim();

    if (
      normalizedIdentifier === DEMO_LOGIN.username &&
      password === DEMO_LOGIN.password
    ) {
      const token = generateToken(DEMO_LOGIN.user.id);

      return res.json({
        success: true,
        message: "Demo login successful.",
        token,
        user: DEMO_LOGIN.user,
      });
    }

    if (!isDBConnected()) {
      return res.status(401).json({
        success: false,
        error: "Only demo login is available right now. Use user1 / password1.",
      });
    }

    const normalizedEmail = normalizedIdentifier;
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id.toString());

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  signup,
  login,
};
