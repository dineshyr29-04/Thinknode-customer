import { createContext, useState, useEffect } from 'react';
import { loginUser } from '../api/apiClient';

export const AuthContext = createContext();

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

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
