const { app } = require("../Desktop/Build-or-Not/server/src/app");
const { connectDB } = require("../Desktop/Build-or-Not/server/src/config/db");

let initialized = false;

module.exports = async (req, res) => {
  if (!initialized) {
    try {
      await connectDB({ optional: true });
    } catch (error) {
      console.error("Database initialization failed:", error.message);
    }

    initialized = true;
  }

  return app(req, res);
};
