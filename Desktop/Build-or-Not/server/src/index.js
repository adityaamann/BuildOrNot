const dotenv = require("dotenv");
const { app } = require("./app");
const { connectDB } = require("./config/db");

dotenv.config();

const PORT = Number(process.env.PORT) || 5002;

if (!process.env.GROQ_API_KEY) {
  console.warn("GROQ_API_KEY is not set in .env file");
}

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is not set. Using demo fallback secret.");
}

async function startServer() {
  try {
    await connectDB({ optional: true });
    app.listen(PORT, () => {
      console.log(`BuildOrNot server running at http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
      console.log(`Auth Signup: POST http://localhost:${PORT}/api/auth/signup`);
      console.log(`Auth Login: POST http://localhost:${PORT}/api/auth/login`);
      console.log(`Analyze: POST http://localhost:${PORT}/api/analyze`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
