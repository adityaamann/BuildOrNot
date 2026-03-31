const mongoose = require("mongoose");

let hasAttemptedConnection = false;

async function connectDB(options = {}) {
  const { optional = false } = options;
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    if (optional) {
      console.warn("MongoDB skipped: MONGO_URI is not set. Running in demo mode.");
      return false;
    }

    throw new Error("MONGO_URI is not set in server/.env");
  }

  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (hasAttemptedConnection && mongoose.connection.readyState === 2) {
    return true;
  }

  hasAttemptedConnection = true;
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
  return true;
}

function isDBConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, isDBConnected };
