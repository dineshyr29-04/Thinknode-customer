import { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NavbarContext } from '../context/NavbarContext';

const NAV_LINKS = [
  { label: 'Home', path: '/home', icon: '🏠' },
  { label: 'Services', path: '/services', icon: '⚙️' },
  { label: 'My Orders', path: '/orders', icon: '📋' },
  { label: 'Contact', path: '/contact', icon: '✉️' },
];

export default function Navbar() {
  const { isExpanded, setIsExpanded } = useContext(NavbarContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Sidebar - Visible on lg and up */}
      <div
        className={`hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:flex-col z-50 lg:transition-all lg:duration-300 lg:ease-in-out ${
          isExpanded ? 'lg:w-64' : 'lg:w-20'
        } bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b-2 border-cyan-500/40 px-3 lg:px-4 flex-shrink-0">
          <Link to="/home" className="flex items-center gap-2 lg:gap-3 group w-full min-w-0">
            <img 
              src="/logo.jpeg" 
              alt="ThinkNode" 
              className="w-10 h-10 rounded-xl flex-shrink-0 object-cover shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300"
            />
            {isExpanded && (
              <div className="flex flex-col gap-0.5 overflow-hidden min-w-0">
                <span className="font-black text-white text-sm tracking-tight leading-tight truncate">ThinkNode</span>
                <span className="text-cyan-300 font-bold text-xs bg-cyan-500/20 px-2 py-0.5 rounded-lg inline-block whitespace-nowrap">Portal</span>
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
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group min-w-0 ${
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
        <div className="px-3 py-5 border-t-2 border-cyan-500/40 flex-shrink-0">
          <button
            onClick={() => navigate('/order')}
            className={`w-full relative group backdrop-blur-md bg-gradient-to-r from-cyan-500/50 to-indigo-600/50 text-white font-bold rounded-xl border-2 border-cyan-400 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 ${
              isExpanded ? 'px-4 py-3' : 'p-3'
            }`}
          >
            <span className="text-lg flex-shrink-0">✚</span>
            {isExpanded && <span className="text-sm">New Project</span>}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </div>

        <div className="px-3 py-5 border-t-2 border-cyan-500/40 flex-shrink-0">
          <button 
            onClick={() => navigate('/home/settings')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/15 hover:border-2 hover:border-cyan-400/50 transition-all duration-300 group min-w-0 ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-cyan-500/30">
              U
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-0.5 text-left overflow-hidden min-w-0">
                <span className="text-white text-sm font-bold truncate">User</span>
                <span className="text-cyan-300 text-xs font-semibold truncate">Profile</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Header - Visible on md and below */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950/80 border-b-2 border-cyan-500/40 backdrop-blur-xl">
        <div className="flex items-center justify-between h-16 px-4 gap-3">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 group flex-1">
            <img 
              src="/logo.jpeg" 
              alt="ThinkNode" 
              className="w-8 h-8 rounded-lg flex-shrink-0 object-cover shadow-lg shadow-cyan-500/30 group-active:scale-95 transition-transform"
            />
            <span className="font-black text-white text-sm tracking-tight leading-tight">ThinkNode</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/home'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-cyan-500/40 to-indigo-500/40 border-2 border-cyan-400 shadow-lg shadow-cyan-500/40'
                      : 'text-white/70 hover:text-white hover:bg-white/15 active:bg-white/25'
                  }`
                }
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
            {/* Added Settings for Mobile */}
            <button
              onClick={() => {
                navigate('/home/settings');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/15 active:bg-white/25 transition-all"
            >
              <span className="text-xl">⚙️</span>
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                navigate('/order');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 px-4 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/50 to-indigo-600/50 text-white font-bold rounded-lg border-2 border-cyan-400 hover:border-cyan-300 active:bg-gradient-to-r active:from-cyan-600/50 active:to-indigo-700/50 transition-all"
            >
              <span>✚</span>
              <span>New Project</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
