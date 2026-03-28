import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const DUMMY_EMAIL = 'demo@thinknode.test';
  const DUMMY_PASS = 'demo';
  const [savedDummy, setSavedDummy] = useState(null);
  const [editingDummy, setEditingDummy] = useState(false);
  const [dummyEmailInput, setDummyEmailInput] = useState('');
  const [dummyPassInput, setDummyPassInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check built-in demo credentials
    if (email === DUMMY_EMAIL && password === DUMMY_PASS) {
      setLoading(true);
      try {
        await login(email, password);
        navigate('/home');
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Login failed');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Check against saved custom dummy (if any)
    if (savedDummy && email === savedDummy.email && password === savedDummy.password) {
      setLoading(true);
      try {
        await login(email, password);
        navigate('/home');
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Login failed');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Attempt backend login
    setLoading(true);
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  // load saved dummy if present
  useEffect(() => {
    const saved = localStorage.getItem('dummyCredentials');
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        // remember saved dummy and availability
        setSavedDummy(obj);
        setHasSavedDummy(true);
      } catch (err) {}
    }
  }, []);

  const [hasSavedDummy, setHasSavedDummy] = useState(false);

  const saveDummy = () => {
    const payload = { email: dummyEmailInput || DUMMY_EMAIL, password: dummyPassInput || DUMMY_PASS };
    localStorage.setItem('dummyCredentials', JSON.stringify(payload));
    setSavedDummy(payload);
    setHasSavedDummy(true);
    setEditingDummy(false);
  };

  const useSavedDummy = () => {
    const raw = localStorage.getItem('dummyCredentials');
    if (!raw) return;
    try {
      const obj = JSON.parse(raw);
      setEmail(obj.email || DUMMY_EMAIL);
      setPassword(obj.password || DUMMY_PASS);
    } catch (err) {
      setEmail(DUMMY_EMAIL);
      setPassword(DUMMY_PASS);
    }
  };

  const deleteSavedDummy = () => {
    localStorage.removeItem('dummyCredentials');
    setSavedDummy(null);
    setHasSavedDummy(false);
    setEditingDummy(false);
  };

  const startEditDummy = () => {
    setDummyEmailInput(savedDummy?.email || DUMMY_EMAIL);
    setDummyPassInput(savedDummy?.password || DUMMY_PASS);
    setEditingDummy(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient -z-10" />

      {/* Floating blurred glowing shapes */}
      <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-purple-600 opacity-40 blur-3xl mix-blend-screen animate-float1 -z-20" />
      <div className="absolute bottom-10 right-[-4rem] w-80 h-80 rounded-full bg-indigo-500 opacity-30 blur-3xl mix-blend-screen animate-float2 -z-20" />
      <div className="absolute top-1/4 right-10 w-44 h-44 rounded-full bg-blue-500 opacity-30 blur-2xl mix-blend-screen animate-float3 -z-20" />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-[400px] max-w-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
      >
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-sm text-white/70">Login to your ThinkNode account</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full py-3 px-4 rounded-lg bg-white/6 border border-white/8 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition"
            />
          </label>

          <label className="block relative">
            <span className="sr-only">Password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full py-3 pr-12 pl-4 rounded-lg bg-white/6 border border-white/8 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.29-6.017M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </label>

          {error && <div className="text-sm text-red-300">{error}</div>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 shadow-lg disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setEmail(DUMMY_EMAIL);
                setPassword(DUMMY_PASS);
              }}
              className="w-full mt-2 py-2 rounded-lg text-sm text-white/80 bg-white/5 border border-white/8"
            >
              Fill demo
            </button>
            <button
              type="button"
              onClick={useSavedDummy}
              className="w-full mt-2 py-2 rounded-lg text-sm text-white/80 bg-white/5 border border-white/8 disabled:opacity-50"
              disabled={!hasSavedDummy}
            >
              Use saved
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-white/70">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-300 hover:underline font-medium">Sign Up</Link>
        </div>

        <div className="mt-3 text-xs text-white/60 text-center">
          Demo credentials: <span className="font-medium text-white">{DUMMY_EMAIL}</span> / <span className="font-medium text-white">{DUMMY_PASS}</span>
        </div>

        <div className="mt-4">
          {!hasSavedDummy || editingDummy ? (
            <div className="space-y-3">
              <div className="text-sm text-white/70">Create a persistent dummy credential (saved locally; won't change unless you delete it)</div>
              <input
                type="email"
                placeholder="dummy@you.test"
                value={dummyEmailInput}
                onChange={(e) => setDummyEmailInput(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-white/6 border border-white/8 text-white"
              />
              <input
                type="text"
                placeholder="dummy password"
                value={dummyPassInput}
                onChange={(e) => setDummyPassInput(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-white/6 border border-white/8 text-white"
              />
              <div className="flex gap-3">
                <button onClick={saveDummy} className="flex-1 py-2 rounded-lg bg-purple-600 text-white">Save Dummy</button>
                {hasSavedDummy && (
                  <button onClick={() => setEditingDummy(false)} className="py-2 px-3 rounded-lg bg-white/5 text-white">Cancel</button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-white/70">Saved dummy:</div>
              <div className="flex items-center justify-between bg-white/6 p-3 rounded-lg">
                <div className="text-sm">
                  <div className="font-medium">{savedDummy?.email}</div>
                  <div className="text-xs text-white/60">Password: {'•'.repeat(6)}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={startEditDummy} className="py-2 px-3 rounded-lg bg-white/5 text-white">Replace</button>
                  <button onClick={deleteSavedDummy} className="py-2 px-3 rounded-lg bg-red-600 text-white">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Local CSS for animations and keyframes */}
      <style>{` 
        .animate-gradient {
          background: linear-gradient(120deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.15) 35%, rgba(99,102,241,0.15) 100%);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-float1 {
          animation: float1 9s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 11s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 8s ease-in-out infinite;
        }

        @keyframes float1 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float2 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(40px) translateX(-30px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float3 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(-10px); }
          100% { transform: translateY(0) translateX(0); }
        }

        /* Responsive tweak */
        @media (max-width: 420px) {
          .w-\[400px\] { width: calc(100% - 32px); }
        }
      `}</style>
    </div>
  );
}
