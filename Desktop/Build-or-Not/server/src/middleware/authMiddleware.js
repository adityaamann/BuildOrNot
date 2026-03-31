const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { isDBConnected } = require("../config/db");
const { getJwtSecret } = require("../utils/jwt");

const DEMO_USER = {
  _id: "demo-user-1",
  name: "user1",
  email: "user1@buildornot.local",
};

async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Not authorized. Missing token.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Not authorized. Invalid token.",
      });
    }

    const decoded = jwt.verify(token, getJwtSecret());

    if (decoded.userId === DEMO_USER._id) {
      req.user = DEMO_USER;
      return next();
    }

    if (!isDBConnected()) {
      return res.status(401).json({
        success: false,
        error: "Not authorized. Database is unavailable.",
      });
    }

    const user = await User.findById(decoded.userId).select("_id name email");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Not authorized. User not found.",
      });
    }

    req.user = user;
    return next();
  } catch (_error) {
    return res.status(401).json({
      success: false,
      error: "Not authorized. Token failed.",
    });
  }
}

module.exports = { protect };
