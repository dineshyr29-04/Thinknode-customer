import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      // Proper navigation with a slight delay to ensure state updates
      setTimeout(() => navigate('/home'), 100);
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-6 group">
            <img 
              src="/logo.jpeg" 
              alt="ThinkNode" 
              className="w-20 h-20 mx-auto transform group-hover:scale-110 transition-transform duration-300 rounded-2xl shadow-lg shadow-cyan-500/30"
            />
          </Link>
          <h1 className="text-white text-4xl font-black mb-2">ThinkNode</h1>
          <p className="text-cyan-400 text-sm font-medium">Client Portal</p>
        </div>

        {/* Glassy Card */}
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-shadow duration-300">
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-white text-2xl font-black mb-8">Welcome Back</h2>

            {error && (
              <div className="backdrop-blur-lg bg-red-500/20 border border-red-500/50 text-red-200 px-5 py-4 rounded-2xl text-sm mb-6 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-white/90 text-sm font-semibold block mb-3">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:placeholder-white/30 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 outline-none transition-all duration-300 hover:bg-white/15 hover:border-white/30"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-white/90 text-sm font-semibold block mb-3">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:placeholder-white/30 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 outline-none transition-all duration-300 hover:bg-white/15 hover:border-white/30"
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm mt-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-cyan-400 rounded" />
                  <span className="text-white/70 group-hover:text-white/90 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Forgot Password ?</a>
              </div>

              {/* Submit Button - Smooth Glassy */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 py-3 relative group backdrop-blur-md bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 text-white font-bold rounded-2xl border border-white/40 hover:border-white/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative">
                  {loading ? 'Signing in...' : 'Sign In'}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-white/60 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Demo Login - Smooth Glassy */}
            <button
              onClick={() => {
                setEmail('demo@example.com');
                setPassword('demo');
              }}
              className="w-full py-3 backdrop-blur-md bg-white/5 border border-white/30 text-white/90 font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-sm group hover:scale-105 transform"
            >
              Quick Demo Access
            </button>

            {/* Footer Link */}
            <p className="text-center text-white/70 text-sm mt-8">
              First time here?{' '}
              <Link to="/" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Back to Home
              </Link>
            </p>
          </div>
        </div>

        {/* Info Box - Glassy */}
        <div className="mt-8 backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors duration-300">
          <p className="text-white/80 text-xs font-medium">
            <span className="text-cyan-400">Demo Account:</span> Use any email + password
          </p>
        </div>
      </div>
    </div>
  );
}
