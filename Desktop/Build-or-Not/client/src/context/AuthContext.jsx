import { createContext, useContext, useMemo, useState } from 'react';
import { loginUser, signupUser, setAuthToken } from '../services/api';

const AuthContext = createContext(null);

function readStoredAuth() {
  const token = localStorage.getItem('buildornot_token');
  const rawUser = localStorage.getItem('buildornot_user');

  if (!token || !rawUser) {
    return { token: null, user: null };
  }

  try {
    return { token, user: JSON.parse(rawUser) };
  } catch {
    localStorage.removeItem('buildornot_token');
    localStorage.removeItem('buildornot_user');
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [{ token, user }, setAuthState] = useState(readStoredAuth);

  const isAuthenticated = Boolean(token);

  const saveAuth = (nextToken, nextUser) => {
    localStorage.setItem('buildornot_token', nextToken);
    localStorage.setItem('buildornot_user', JSON.stringify(nextUser));
    setAuthToken(nextToken);
    setAuthState({ token: nextToken, user: nextUser });
  };

  const clearAuth = () => {
    localStorage.removeItem('buildornot_token');
    localStorage.removeItem('buildornot_user');
    setAuthToken(null);
    setAuthState({ token: null, user: null });
  };

  const signup = async ({ name, email, password }) => {
    const data = await signupUser({ name, email, password });
    saveAuth(data.token, data.user);
    return data;
  };

  const login = async ({ email, password }) => {
    const data = await loginUser({ email, password });
    saveAuth(data.token, data.user);
    return data;
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      signup,
      login,
      logout: clearAuth,
    }),
    [user, token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
