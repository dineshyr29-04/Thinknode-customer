import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', path: '/home', icon: '🏠' },
  { label: 'Services', path: '/services', icon: '⚙️' },
  { label: 'My Orders', path: '/orders', icon: '📋' },
  { label: 'Contact', path: '/contact', icon: '✉️' },
];

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-cyan-500/20 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-cyan-500/20 px-4">
          <Link to="/home" className="flex items-center gap-3 group w-full">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/30">
              <span className="text-white font-black text-sm">TN</span>
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className="font-black text-white text-sm tracking-tight leading-tight">ThinkNode</span>
                <span className="text-cyan-300 font-semibold text-xs">Portal</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/home'}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/20 border border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:border hover:border-cyan-400/30'
                }`
              }
            >
              <span className="text-lg flex-shrink-0">{link.icon}</span>
              {isExpanded && <span className="truncate">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="px-3 py-6 border-t border-cyan-500/20">
          <button
            onClick={() => navigate('/order')}
            className={`w-full relative group backdrop-blur-md bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 text-white text-sm font-semibold rounded-xl border border-white/40 hover:border-white/70 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 ${
              isExpanded ? 'px-4 py-3' : 'p-3'
            }`}
          >
            <span className="text-lg">✚</span>
            {isExpanded && <span>New Project</span>}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-3 py-4 border-t border-cyan-500/20">
          <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 transition-colors group ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
              U
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-0.5 text-left overflow-hidden">
                <span className="text-white text-sm font-medium truncate">User</span>
                <span className="text-white/50 text-xs truncate">Profile</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
