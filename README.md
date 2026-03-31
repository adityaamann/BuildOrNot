# BuildOrNot

> **AI-Powered Startup Idea Validator** — Analyze your startup ideas with AI-driven insights on market demand, competition, monetization strategies, and viability scoring.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)

## 🎯 Overview

BuildOrNot is a full-stack SaaS application that leverages AI to validate startup ideas. Users can submit their idea concepts and receive comprehensive analysis including:

- **Market Demand Analysis** — Is there a market for this idea?
- **Competitor Research** — Who are the competitors and market landscape?
- **Audience Targeting** — Who is your target audience?
- **Monetization Strategies** — How can you make money?
- **Market Size Calculation** — TAM, SAM, SOM projections
- **Risk Assessment** — Key risks and mitigation strategies
- **Viability Score** — AI-generated confidence score (1-10)

## 🚀 Features

- ✅ **AI-Powered Analysis** — Uses Groq API with llama-3.3-70b model for instant insights
- ✅ **User Authentication** — Secure signup/login with JWT tokens
- ✅ **Dark SaaS UI** — Premium dark theme with Tailwind CSS
- ✅ **Responsive Design** — Mobile-first, works on all screen sizes
- ✅ **Real-time Processing** — Fast analysis with structured JSON responses
- ✅ **User Profiles** — Track account details and history
- ✅ **Protected Routes** — Secure access to analysis features

## 🏗️ Tech Stack

### Frontend
- **React 19.2** — Modern UI library with hooks
- **Vite 8** — Lightning-fast build tool
- **React Router 7** — Client-side routing
- **Tailwind CSS 3.4** — Utility-first CSS framework
- **Axios 1.13** — HTTP client with automatic token injection
- **Lucide React** — Beautiful SVG icons

### Backend
- **Node.js & Express 4.21** — REST API server
- **MongoDB 8.x** — NoSQL database
- **Mongoose 8.19** — MongoDB ODM
- **JWT** — JSON Web Token authentication
- **Bcryptjs** — Password hashing
- **Groq API** — AI-powered analysis engine

### Infrastructure
- **Vite Proxy** — Frontend proxy to backend API
- **CORS** — Cross-origin resource sharing enabled
- **Environment Variables** — Secure configuration management

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** 18+ and **npm** 9+
- **MongoDB** 5.0+ (local or MongoDB Atlas)
- **Groq API Key** ([get free key here](https://console.groq.com/keys))
- Git for version control

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/BuildOrNot.git
cd BuildOrNot
```

### 2. Setup Backend

```bash
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/buildornot
JWT_SECRET=your_jwt_secret_key_here_change_this
GROQ_API_KEY=your_groq_api_key_here
EOF

# Start backend
npm run dev
```

The backend will start on `http://localhost:5002`

### 3. Setup Frontend

```bash
cd ../client
npm install

# Start frontend dev server
npm run dev
```

The frontend will start on `http://localhost:5173` or `http://localhost:5174` (if 5173 is in use)

### 4. Start MongoDB (if not running)

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or manually
mongod --dbpath /path/to/db/directory

# Or with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Create new user account |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `GET` | `/api/auth/me` | Get current user info (protected) |

**Example: Signup**
```bash
curl -X POST http://localhost:5002/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Founder",
    "email": "jane@example.com",
    "password": "securepassword123"
  }'
```

**Example: Login**
```bash
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securepassword123"
  }'
```

### Analysis

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyze` | Submit idea for AI analysis (protected) |

**Example: Analyze Idea**
```bash
curl -X POST http://localhost:5002/api/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "idea": "An AI-powered personal finance app for freelancers",
    "industry": "Fintech"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "marketDemand": "High demand for freelancer-specific financial tools...",
    "competitors": ["Wave", "FreshBooks", "Stripe Invoicing"],
    "targeAudience": "Freelancers, contractors, solopreneurs",
    "monetizationStrategies": ["Subscription model", "Commission on payments"],
    "tam": "$50B",
    "sam": "$5B",
    "som": "$500M",
    "risks": ["High competition", "Regulatory challenges"],
    "viabilityScore": 8,
    "analysis": "This is a viable idea with strong market potential..."
  }
}
```

## 📂 Project Structure

```
BuildOrNot/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   │   ├── ui/                # Base UI components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── InputField.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── PricingSection.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global auth state
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx    # Home page
│   │   │   ├── LoginPage.jsx      # Login form
│   │   │   ├── SignupPage.jsx     # Registration form
│   │   │   ├── InputPage.jsx      # Idea submission
│   │   │   ├── ResultsPage.jsx    # Analysis results
│   │   │   └── ProfilePage.jsx    # User profile
│   │   ├── services/
│   │   │   └── api.js             # Axios API client
│   │   ├── App.jsx                # Main router
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   ├── package.json
│   └── index.html
│
├── server/                          # Node.js backend
│   ├── src/
│   │   ├── controllers/           # Route handlers
│   │   │   └── authController.js
│   │   ├── middleware/            # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── models/                # Mongoose schemas
│   │   │   └── User.js
│   │   ├── routes/                # API routes
│   │   │   ├── auth.js
│   │   │   └── analyze.js
│   │   ├── services/              # Business logic
│   │   │   └── groq.js
│   │   ├── utils/                 # Utilities
│   │   │   ├── generateToken.js
│   │   │   └── promptBuilder.js
│   │   ├── config/
│   │   │   └── db.js              # Database connection
│   │   └── index.js               # Server entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md                        # This file
```

## 🔐 Authentication Flow

```
User Signup/Login
      ↓
Backend validates credentials & generates JWT
      ↓
Token stored in localStorage (frontend)
      ↓
Axios interceptor adds Authorization header
      ↓
Protected routes verified via authMiddleware
      ↓
Access to /analyze and /profile pages
```

## 🚢 Deployment

### Frontend (Vercel)

```bash
cd client
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GROQ_API_KEY`
3. Set start command: `node src/index.js`

### Database (MongoDB Atlas)

1. Create cluster at [mongodb.com/cloud](https://mongodb.com/cloud)
2. Get connection string
3. Set `MONGO_URI` in backend `.env`

## 📝 Environment Variables

### Server (.env)
```env
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/buildornot
JWT_SECRET=your_super_secret_key_change_this
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5002/api
VITE_APP_NAME=BuildOrNot
```

## 🧪 Testing

### Manual Testing

1. **Signup**: Create a new account at `/signup`
2. **Login**: Sign in at `/login`
3. **Submit Idea**: Go to `/analyze` and submit an idea
4. **View Results**: See AI analysis on results page
5. **Profile**: View account details at `/profile`

### API Testing (cURL)
See the [API Endpoints](#-api-endpoints) section for examples.

## 🎨 UI Components

### Available Components
- **Button** — CTA and action buttons with variants
- **Card** — Container with glassmorphism effect
- **InputField** — Text inputs with icons and validation
- **LoadingSpinner** — Loading state indicator
- **Navbar** — Top navigation with auth menu
- **FeaturesSection** — 6-card feature grid
- **PricingSection** — Pricing tiers display

### Tailwind Configuration
- Dark theme with `#0b1220` base color
- Indigo accent colors for CTAs
- Premium glass-morphism effects
- Responsive grid layouts

## 📱 Responsive Breakpoints

Built with mobile-first approach:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5002/5173 already in use | Kill process: `lsof -ti tcp:5002 \| xargs kill -9` |
| MongoDB connection refused | Ensure MongoDB is running: `mongod` or brew services |
| CORS errors | Check Vite proxy in `client/vite.config.js` |
| JWT token expired | Clear localStorage and login again |
| API returns 401 Unauthorized | Verify token is in localStorage and valid |

## 🔒 Security Features

- ✅ Password hashing with bcryptjs (12 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Protected API routes with middleware
- ✅ CORS enabled for trusted origins
- ✅ Environment variables for sensitive data
- ✅ Email validation on signup


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

## 👨‍💻 Author

**Aditya Aman**  
- GitHub: [@adityaaman](https://github.com/adityaaman)
- Email: adityaamaan271@gmail.com

## 🙏 Acknowledgments

- [Groq API](https://groq.com/) for AI analysis
- [React Team](https://react.dev/) for modern UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for database
- [Vite](https://vitejs.dev/) for fast build tool

---

**Built with ❤️ for startup founders and innovators.**

