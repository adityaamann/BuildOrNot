import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const userInitial = (user?.name || user?.email || 'U').charAt(0).toUpperCase();

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  const handleProfile = () => {
    setIsProfileOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-surface-950/82 backdrop-blur-2xl">
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-3 items-center px-3 sm:px-4">
        <div className="justify-self-start">
          <Link to="/" className="inline-flex items-baseline gap-1 text-white transition-opacity hover:opacity-90">
            <span className="font-display text-xl tracking-tight">BuildOrNot</span>
            <span className="hidden text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-brand-amber sm:inline">
              Studio
            </span>
          </Link>
        </div>

        <nav className="justify-self-center">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-sm font-medium tracking-wide text-slate-300 transition-colors hover:text-brand-amber">
                Home
              </Link>
            </li>
            <li>
              <Link to="/#features" className="text-sm font-medium tracking-wide text-slate-300 transition-colors hover:text-brand-amber">
                Features
              </Link>
            </li>
            <li>
              <Link to="/#faqs" className="text-sm font-medium tracking-wide text-slate-300 transition-colors hover:text-brand-amber">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/#pricing" className="text-sm font-medium tracking-wide text-slate-300 transition-colors hover:text-brand-amber">
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        <div className="relative justify-self-end" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/35 bg-surface-800/85 text-sm font-semibold text-brand-amber shadow-[0_8px_24px_rgba(8,16,34,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-amber/60"
            aria-label="Open profile menu"
          >
            {userInitial}
          </button>

          {isProfileOpen ? (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-surface-800/95 p-1.5 shadow-soft backdrop-blur-xl">
              <button
                type="button"
                onClick={handleProfile}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-white/5"
              >
                Profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
