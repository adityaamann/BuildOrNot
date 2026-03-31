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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#060c16]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-baseline gap-2 text-white transition-opacity hover:opacity-90">
            <span className="font-display text-[1.4rem] tracking-tight">BuildOrNot</span>
            <span className="hidden rounded-full border border-brand-gold/35 bg-brand-gold/12 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-brand-amber sm:inline">
              Alpha
            </span>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
            <li>
              <Link to="/" className="rounded-full px-4 py-2 text-sm font-medium tracking-wide text-slate-300 transition-colors hover:bg-white/[0.07] hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/#features" className="rounded-full px-4 py-2 text-sm font-medium tracking-wide text-slate-300 transition-colors hover:bg-white/[0.07] hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link to="/#faqs" className="rounded-full px-4 py-2 text-sm font-medium tracking-wide text-slate-300 transition-colors hover:bg-white/[0.07] hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/#pricing" className="rounded-full px-4 py-2 text-sm font-medium tracking-wide text-slate-300 transition-colors hover:bg-white/[0.07] hover:text-white">
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/35 bg-[#111a2a] text-sm font-semibold text-brand-amber shadow-[0_12px_24px_rgba(3,8,18,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-amber/60"
            aria-label="Open profile menu"
          >
            {userInitial}
          </button>

          {isProfileOpen ? (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#121c2d]/95 p-1.5 shadow-soft backdrop-blur-xl">
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
