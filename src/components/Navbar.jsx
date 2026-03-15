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
        } bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b-2 border-cyan-500/40 px-4">
          <Link to="/home" className="flex items-center gap-3 group w-full">
            <img 
              src="/logo.jpeg" 
              alt="ThinkNode" 
              className="w-10 h-10 rounded-xl flex-shrink-0 object-cover shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300"
            />
            {isExpanded && (
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className="font-black text-white text-sm tracking-tight leading-tight">ThinkNode</span>
                <span className="text-cyan-300 font-bold text-xs bg-cyan-500/20 px-2 py-0.5 rounded-lg inline-block">Portal</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/home'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-cyan-500/40 to-indigo-500/40 border-2 border-cyan-400 shadow-lg shadow-cyan-500/40'
                    : 'text-white/60 hover:text-white hover:bg-white/15 hover:border-2 hover:border-cyan-400/50'
                }`
              }
            >
              <span className="text-lg flex-shrink-0">{link.icon}</span>
              {isExpanded && <span className="truncate text-sm">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="px-3 py-5 border-t-2 border-cyan-500/40">
          <button
            onClick={() => navigate('/order')}
            className={`w-full relative group backdrop-blur-md bg-gradient-to-r from-cyan-500/50 to-indigo-600/50 text-white font-bold rounded-xl border-2 border-cyan-400 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 ${
              isExpanded ? 'px-4 py-3' : 'p-3'
            }`}
          >
            <span className="text-lg">✚</span>
            {isExpanded && <span className="text-sm">New Project</span>}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-3 py-5 border-t-2 border-cyan-500/40">
          <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/15 hover:border-2 hover:border-cyan-400/50 transition-all duration-300 group ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-cyan-500/30">
              U
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-0.5 text-left overflow-hidden">
                <span className="text-white text-sm font-bold truncate">User</span>
                <span className="text-cyan-300 text-xs font-semibold truncate">Profile</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
