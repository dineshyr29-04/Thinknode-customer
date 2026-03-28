import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import BeautifulSelect from '../components/BeautifulSelect';
import { registerUser } from '../api/apiClient';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirm) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      const payload = { name, email, password, role };
      await registerUser(payload);
      setStatus('success');
      setLoading(false);
      setTimeout(() => navigate('/login'), 900);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Registration failed');
      setStatus('error');
      setLoading(false);
      setTimeout(() => setStatus(null), 1600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden px-4">
      <div className="absolute inset-0 animate-gradient -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-md shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-center">Create your ThinkNode account</h2>
        <p className="text-sm text-center text-white/70 mb-6">Sign up to access the ThinkNode client portal</p>

        {error && <div className="text-sm text-red-300 mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full py-3 px-4 rounded-lg bg-white/6 border border-white/8 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full py-3 px-4 rounded-lg bg-white/6 border border-white/8 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition"
          />

          <BeautifulSelect
            label="Who are you?"
            value={role}
            onChange={(v) => setRole(v)}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'developer', label: 'Developer' },
              { value: 'organization', label: 'Organization' },
              { value: 'other', label: 'Other' },
            ]}
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
          </div>

          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirm"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="w-full py-3 pr-12 pl-4 rounded-lg bg-white/6 border border-white/8 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none"
            >
              {showConfirm ? (
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
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 shadow-lg disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create account'}
          </motion.button>
        </form>

        <div className="mt-4 text-center text-sm text-white/70">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-300 hover:underline font-medium">Sign in</Link>
        </div>

        {/* status indicator (success / error) */}
        {status && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className={`flex items-center gap-3 px-4 py-2 rounded-full ${status === 'success' ? 'bg-green-500/95' : 'bg-red-500/95'} text-white shadow-lg`}
            >
              {status === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium text-sm">{status === 'success' ? 'Account created' : 'Registration failed'}</span>
            </motion.div>
          </div>
        )}
      </motion.div>

      <style>{`
        .animate-gradient {
          background: linear-gradient(120deg, rgba(124,58,237,0.06) 0%, rgba(59,130,246,0.06) 35%, rgba(99,102,241,0.06) 100%);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
    </div>
  );
}
