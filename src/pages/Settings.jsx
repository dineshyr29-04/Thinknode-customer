import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ShieldCheck, 
  Bell, 
  LogOut, 
  Camera, 
  Key, 
  Smartphone, 
  Mail, 
  ChevronRight,
  Eye,
  EyeOff,
  Palette
} from 'lucide-react';

export default function Settings() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.name || 'ThinkNode User');
  const [visualPrefs, setVisualPrefs] = useState({
    glass: true,
    motion: true,
    accent: false,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const BentoTile = ({ children, className = "", delay = 0 }) => (
    <motion.div
      variants={itemVariants}
      className={`relative group bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 ${className}`}
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[40px] font-black tracking-tight bg-gradient-to-r from-[#450693] via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Portal Settings
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg font-medium"
            >
              Personalize your environment & secure your account.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md"
          >
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-[#450693] text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              General
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-[#450693] text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              Privacy
            </button>
          </motion.div>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {activeTab === 'profile' ? (
            <>
              {/* Profile Overview (Span 4) */}
              <BentoTile className="md:col-span-4 flex flex-col items-center text-center justify-center min-h-[400px]">
                <div className="relative group/avatar cursor-pointer flex flex-col items-center">
                  <div className="w-40 h-40 rounded-[2rem] bg-gradient-to-br from-[#450693] via-indigo-600 to-cyan-500 flex items-center justify-center text-white text-6xl font-black shadow-[0_0_50px_rgba(69,6,147,0.3)] mb-8 transform group-hover/avatar:scale-105 transition-transform duration-500">
                    {user?.name?.substring(0, 2).toUpperCase() || 'TN'}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-[2rem] opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity flex-col gap-2 backdrop-blur-sm">
                    <Camera className="w-10 h-10 text-white" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Change</span>
                  </div>
                </div>
                <h2 className="text-3xl font-black text-white mb-3 tracking-tighter">
                  {user?.name || 'ThinkNode User'}
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold tracking-tight mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Premium Subscriber
                </div>
                <button 
                  onClick={handleLogout}
                  className="mt-auto group flex items-center justify-center gap-2 w-full py-4 bg-red-500/10 border-2 border-red-500/20 rounded-2xl text-red-500 font-black hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Secure Sign Out
                </button>
              </BentoTile>

              {/* Personal Info Tile (Span 8) */}
              <BentoTile className="md:col-span-8">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#450693]/20 rounded-3xl text-[#450693]">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Identity Details</h3>
                      <p className="text-slate-400 font-medium">Verify your portal presence and contact info.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold border transition-all ${isEditing ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'}`}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Info'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Identity Label</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        disabled={!isEditing}
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border-2 rounded-2xl text-white font-bold outline-none transition-all ${isEditing ? 'border-cyan-500/50 focus:border-cyan-500' : 'border-white/5 pointer-events-none opacity-70'}`}
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Registration Level</label>
                    <div className="w-full px-4 py-4 bg-white/5 border-2 border-white/5 rounded-2xl text-white font-bold flex items-center justify-between">
                      <span>Tier 1 Enterprise</span>
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 rounded-r-2xl">
                  <p className="text-cyan-400 text-sm font-bold italic leading-relaxed">
                    Personalizing your identity helps our AI agents tailor their solutions to your specific workflow requirements.
                  </p>
                </div>
              </BentoTile>

              {/* Preferences Tile (Span 6) */}
              <BentoTile className="md:col-span-6">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-purple-500/20 rounded-3xl text-purple-400">
                    <Palette className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Visual Synthesis</h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    { id: 'glass', label: 'Ultra-Gloss Glassmorphism', desc: 'Enable advanced backdrop-blur effects.' },
                    { id: 'motion', label: 'Fluid Motion Engine', desc: 'Smoother transitions and micro-interactions.' },
                    { id: 'accent', label: 'Dynamic Accent Sync', desc: 'Auto-sync portal colors with your brand.' },
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between group p-2 hover:bg-white/5 rounded-2xl transition-all">
                      <div>
                        <p className="font-bold text-white group-hover:text-cyan-400 transition-colors uppercase text-sm tracking-wide">{pref.label}</p>
                        <p className="text-slate-500 text-xs font-medium mt-1">{pref.desc}</p>
                      </div>
                      <div 
                        onClick={() => setVisualPrefs(prev => ({ ...prev, [pref.id]: !prev[pref.id] }))}
                        className={`w-14 h-8 rounded-full relative cursor-pointer transition-all duration-300 border-2 ${visualPrefs[pref.id] ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-800 border-white/5'}`}
                      >
                        <motion.div 
                          animate={{ 
                            x: visualPrefs[pref.id] ? 24 : 0,
                            scale: visualPrefs[pref.id] ? 1.1 : 1
                          }}
                          className={`absolute top-1 left-1 w-5 h-5 rounded-full shadow-lg transition-all ${visualPrefs[pref.id] ? 'bg-white' : 'bg-slate-600'}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </BentoTile>

              {/* Notification Tile (Span 6) */}
              <BentoTile className="md:col-span-6">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-yellow-500/20 rounded-3xl text-yellow-500">
                    <Bell className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Transmission Feed</h3>
                </div>
                
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${val ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-500'}`}>
                          {key === 'email' ? <Mail className="w-5 h-5" /> : key === 'push' ? <Smartphone className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-bold text-white capitalize tracking-wide">{key} Synthesis</p>
                          <p className="text-slate-500 text-xs font-medium">Real-time sync enabled</p>
                        </div>
                      </div>
                      <div 
                        onClick={() => setNotifications(n => ({...n, [key]: !n[key]}))}
                        className={`w-14 h-8 rounded-full relative cursor-pointer transition-all duration-300 border-2 ${val ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-800 border-white/5'}`}
                      >
                        <motion.div 
                          animate={{ 
                            x: val ? 24 : 0,
                            scale: val ? 1.1 : 1
                          }}
                          className={`absolute top-1 left-1 w-5 h-5 rounded-full shadow-lg transition-all ${val ? 'bg-white' : 'bg-slate-600'}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </BentoTile>
            </>
          ) : (
            <>
              {/* Security Header (Span 12) */}
              <BentoTile className="md:col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="p-6 bg-green-500/20 rounded-[2.5rem] text-green-400 shadow-[0_0_40px_rgba(74,222,128,0.15)]">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white mb-2">Security Nexus</h3>
                    <p className="text-slate-400 text-lg font-medium">End-to-end encryption & perimeter defense status.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-500/10 border-2 border-green-500/20 px-6 py-4 rounded-3xl">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 font-black tracking-widest uppercase text-sm">System Secure</span>
                </div>
              </BentoTile>

              {/* Password Tile (Span 7) */}
              <BentoTile className="md:col-span-7">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-indigo-500/20 rounded-3xl text-indigo-400">
                    <Key className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Access Credentials</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Current Backbone Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        readOnly 
                        value="••••••••••••••••"
                        className="w-full px-6 py-5 bg-white/5 border-2 border-white/5 rounded-3xl text-white font-bold outline-none"
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5 text-cyan-400" /> : <Eye className="w-5 h-5 text-slate-500" />}
                      </button>
                    </div>
                  </div>
                  <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-3xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3">
                    Re-initialize Security Key
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </BentoTile>

              {/* 2FA Tile (Span 5) */}
              <BentoTile className="md:col-span-5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-orange-500/20 rounded-3xl text-orange-400">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">2-Factor Sync</h3>
                </div>
                
                <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 text-center space-y-6">
                  <div className="p-6 bg-slate-900 rounded-3xl inline-block border-2 border-white/5">
                    <div className="grid grid-cols-3 gap-2">
                       {[...Array(6)].map((_, i) => (
                         <div key={i} className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-500/40" />
                       ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    Protect access with hardware security keys or authenticator apps.
                  </p>
                  <button className="w-full py-4 bg-orange-500/10 border-2 border-orange-500/20 rounded-2xl text-orange-400 font-bold hover:bg-orange-500 hover:text-white transition-all">
                    Initialize Setup
                  </button>
                </div>
              </BentoTile>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
