function getJwtSecret() {
  return process.env.JWT_SECRET || "buildornot-demo-secret";
}

module.exports = { getJwtSecret };
