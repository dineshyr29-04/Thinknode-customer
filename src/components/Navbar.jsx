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
          isExpanded ? 'w-72' : 'w-24'
        } bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div className="h-28 flex items-center justify-center border-b-2 border-cyan-500/40 px-4">
          <Link to="/home" className="flex items-center gap-4 group w-full">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-indigo-600 flex items-center justify-center flex-shrink-0 transform group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-cyan-500/50">
              <span className="text-white font-black text-lg">TN</span>
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="font-black text-white text-base tracking-tight leading-tight">ThinkNode</span>
                <span className="text-cyan-300 font-bold text-xs bg-cyan-500/20 px-2 py-1 rounded-lg inline-block">Portal</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/home'}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-semibold transition-all duration-300 group ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-cyan-500/40 to-indigo-500/40 border-2 border-cyan-400 shadow-lg shadow-cyan-500/40'
                    : 'text-white/60 hover:text-white hover:bg-white/15 hover:border-2 hover:border-cyan-400/50'
                }`
              }
            >
              <span className="text-2xl flex-shrink-0">{link.icon}</span>
              {isExpanded && <span className="truncate text-base">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="px-4 py-8 border-t-2 border-cyan-500/40">
          <button
            onClick={() => navigate('/order')}
            className={`w-full relative group backdrop-blur-md bg-gradient-to-r from-cyan-500/50 to-indigo-600/50 text-white font-bold rounded-2xl border-2 border-cyan-400 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden flex items-center justify-center gap-3 ${
              isExpanded ? 'px-5 py-4' : 'p-4'
            }`}
          >
            <span className="text-2xl">✚</span>
            {isExpanded && <span className="text-base">New Project</span>}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-4 py-8 border-t-2 border-cyan-500/40">
          <button className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-white/15 hover:border-2 hover:border-cyan-400/50 transition-all duration-300 group ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg shadow-cyan-500/30">
              U
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-1 text-left overflow-hidden">
                <span className="text-white text-base font-bold truncate">User</span>
                <span className="text-cyan-300 text-xs font-semibold truncate">Profile</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
