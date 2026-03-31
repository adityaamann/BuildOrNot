import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail, User, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      return 'Name, email, and password are required.';
    }

    if (form.name.trim().length < 2) {
      return 'Name must be at least 2 characters.';
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      return 'Please enter a valid email address.';
    }

    if (form.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
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
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center justify-center">
      <Card className="w-full rounded-3xl p-8 md:p-10">
        <div className="mb-8 text-center">
          <p className="subtle-badge mb-4">Create Workspace</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100">Create account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-amber transition-colors hover:text-[#f3deba]">
              Log in
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
            <p className="text-sm text-rose-200">{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputField
            id="name"
            name="name"
            label="Full Name"
            value={form.name}
            onChange={onChange}
            placeholder="Jane Founder"
            icon={User}
          />

          <InputField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@company.com"
            icon={Mail}
          />

          <InputField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={onChange}
            placeholder="At least 6 characters"
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

          <InputField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={onChange}
            placeholder="Re-enter your password"
            icon={Lock}
            rightSlot={(
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-xs text-slate-300 transition-colors hover:bg-white/5 hover:text-slate-100"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            )}
          />

          <Button type="submit" fullWidth disabled={isSubmitting}>
            <UserPlus className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          By creating an account, you agree to our{' '}
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
