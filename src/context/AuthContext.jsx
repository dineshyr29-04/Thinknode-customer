import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { loginUser } from '../api/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // If the Vite env `VITE_NO_BACKEND` is set to "true", do a local mocked login
    const noBackend = import.meta.env.VITE_NO_BACKEND === 'true';
    if (noBackend) {
      const userData = { email, name: email?.split?.('@')?.[0] || 'Demo User' };
      const token = `dev-token-${Date.now()}`;
      localStorage.setItem('tnc_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return Promise.resolve(userData);
    }

    try {
      const res = await loginUser({ email, password });
      const data = res.data || {};
      const token = data.token || data.accessToken || data.access_token;
      const userData = data.user || data.userData || { email };
      if (token) localStorage.setItem('tnc_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tnc_token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
