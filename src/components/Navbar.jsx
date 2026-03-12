import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'My Orders', path: '/orders' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-black text-sm">TN</span>
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">ThinkNode</span>
            <span className="hidden sm:inline text-indigo-600 font-semibold text-xs bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              Portal
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/order')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-md hover:shadow-indigo-200 shadow-indigo-100"
            >
              Start a Project
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-100 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => { navigate('/order'); setOpen(false); }}
              className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold rounded-xl"
            >
              Start a Project
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
