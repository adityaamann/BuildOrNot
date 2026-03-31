const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("./jwt");

function generateToken(userId) {
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: "7d",
  });
}

module.exports = { generateToken };
