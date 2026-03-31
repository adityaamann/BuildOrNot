import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [form, setForm] = useState({ email: 'user1', password: 'password1' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.email.trim() || !form.password.trim()) {
      return 'Email/username and password are required.';
    }

    const normalized = form.email.trim().toLowerCase();
    const isDemoUsername = normalized === 'user1';
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!isDemoUsername && !emailRegex.test(form.email)) {
      return 'Please enter a valid email address.';
    }

    if (form.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email: form.email, password: form.password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center justify-center">
      <Card className="w-full rounded-3xl p-8 md:p-10">
        <div className="mb-8 text-center">
          <p className="subtle-badge mb-4">Welcome Back</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100">Log in</h1>
          <p className="mt-2 text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium text-brand-amber transition-colors hover:text-[#f3deba]">
              Sign up
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
            <p className="text-sm text-rose-100">{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputField
            id="email"
            name="email"
            label="Email or Username"
            type="text"
            value={form.email}
            onChange={onChange}
            placeholder="user1 or you@company.com"
            icon={Mail}
          />

          <InputField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={onChange}
            placeholder="Enter your password"
            icon={Lock}
            rightSlot={(
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-xs text-slate-300 transition-colors hover:bg-white/5 hover:text-slate-100"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPassword ? 'Hide' : 'Show'}
              </button>
            )}
          />

          <Button type="submit" fullWidth disabled={isSubmitting}>
            <LogIn className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Signing in...' : 'Continue'}
          </Button>

          <p className="text-center text-xs text-slate-500">
            Demo login is prefilled: <span className="text-slate-300">user1 / password1</span>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-slate-400 transition-colors hover:text-slate-300">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-slate-400 transition-colors hover:text-slate-300">
            Privacy Policy
          </a>
          .
        </p>
      </Card>
    </div>
  );
}
