import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import InputPage from './pages/InputPage'
import ResultsPage from './pages/ResultsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="relative min-h-screen overflow-hidden bg-surface-950 text-slate-100">
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_13%,rgba(198,170,115,0.2),transparent_28%),radial-gradient(circle_at_85%_7%,rgba(106,145,202,0.18),transparent_30%),linear-gradient(180deg,#0a1322_0%,#060b13_60%,#04070f_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '54px 54px',
              }}
            />
            <div className="absolute -bottom-44 -left-16 h-[33rem] w-[33rem] rounded-full bg-brand-royal/20 blur-[185px]" />
            <div className="absolute -top-28 right-0 h-[31rem] w-[31rem] rounded-full bg-brand-gold/16 blur-[185px]" />
          </div>
          <Navbar />
          <main className="flex flex-1 flex-col px-4 py-8 md:px-6 md:py-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/analyze"
                element={
                  <ProtectedRoute>
                    <InputPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <ResultsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
