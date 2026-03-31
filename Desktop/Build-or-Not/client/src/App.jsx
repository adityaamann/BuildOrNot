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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(199,165,106,0.16),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(88,169,158,0.12),transparent_28%),linear-gradient(180deg,#081022_0%,#050915_55%,#04070f_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '42px 42px',
              }}
            />
            <div className="absolute -bottom-44 -left-28 h-[32rem] w-[32rem] rounded-full bg-brand-royal/20 blur-[180px]" />
            <div className="absolute -bottom-44 -right-24 h-[30rem] w-[30rem] rounded-full bg-brand-gold/18 blur-[180px]" />
          </div>
          <Navbar />
          <main className="flex-1 flex flex-col px-4 py-8 md:px-6 md:py-10">
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
