import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
        <p className="text-slate-400 mt-2">Manage your profile, security, and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-xl border-2 border-cyan-500/20 rounded-3xl p-8 text-center shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-indigo-600" />
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 mx-auto flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-cyan-500/40 mb-6">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{user?.name || 'User'}</h2>
            <p className="text-cyan-400 text-sm font-semibold mb-6">{user?.email || 'user@example.com'}</p>
            
            <button className="w-full py-3 px-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white text-sm font-medium transition-all mb-3 text-center">
              Change Avatar
            </button>
            <button 
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-xl text-red-400 text-sm font-semibold transition-all text-center"
            >
              Log Out
            </button>
          </motion.div>
        </div>

        {/* Right Column: Settings Sections */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Section */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">👤</span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium focus-within:border-cyan-500 transition-all">
                  {user?.name || 'User Name'}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium opacity-60">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Security Section */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">🔒</span>
              Security & Privacy
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <div>
                  <p className="text-white font-semibold text-sm">Two-Factor Authentication</p>
                  <p className="text-slate-400 text-xs mt-1">Add an extra layer of security to your account.</p>
                </div>
                <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-not-allowed border border-white/10 opacity-50">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-slate-600 rounded-full" />
                </div>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <button className="text-cyan-400 text-sm font-bold hover:text-cyan-300 transition-colors">
                Change Password →
              </button>
            </div>
          </motion.section>

          {/* Preferences Section */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400">🔔</span>
              Notifications
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">Email Notifications</p>
                  <p className="text-slate-400 text-xs mt-1">Receive project updates and order confirmations.</p>
                </div>
                <div className="w-12 h-6 bg-cyan-500/30 rounded-full relative cursor-pointer border border-cyan-500/50">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-cyan-400 rounded-full shadow-sm shadow-cyan-500" />
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
