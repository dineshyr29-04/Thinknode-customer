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
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Registration failed');
      setLoading(false);
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

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full py-3 px-4 rounded-lg bg-white/6 border border-white/8 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
            className="w-full py-3 px-4 rounded-lg bg-white/6 border border-white/8 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition"
          />

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
