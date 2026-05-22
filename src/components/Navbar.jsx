import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useNavbar } from '../context/NavbarContext';

const NAV_LINKS = [
  { label: 'Home', path: '/home' },
  { label: 'Services', path: '/services' },
  { label: 'My Orders', path: '/orders' },
  { label: 'Contact', path: '/contact' },
  { label: 'Settings', path: '/home/settings' },
];

export default function Navbar() {
  const { isExpanded, setIsExpanded } = useNavbar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Sidebar - Visible on lg and up */}
      <div
        className={`hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:flex-col z-50 lg:transition-all lg:duration-300 lg:ease-in-out ${
          isExpanded ? 'lg:w-64' : 'lg:w-20'
        } bg-white border-r border-black`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-3 lg:px-4 flex-shrink-0 border-b border-black">
          <Link to="/home" className="flex items-center gap-2 lg:gap-3 group w-full min-w-0">
            <img 
              src="/logo.jpeg" 
              alt="ThinkNode" 
              className="w-10 h-10 flex-shrink-0 object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {isExpanded && (
              <div className="flex flex-col gap-0.5 overflow-hidden min-w-0">
                <span className="font-black text-black text-lg tracking-tight leading-tight truncate">ThinkNode</span>
                <span className="text-black font-semibold text-sm border border-black px-2 py-0.5 inline-block whitespace-nowrap">Portal</span>
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
                `flex items-center gap-3 px-3 py-3 text-sm font-medium transition-all duration-200 group min-w-0 border border-transparent ${
                  isActive
                    ? 'text-white bg-black border-black'
                    : 'text-black/60 hover:text-black hover:border-black hover:bg-black/5'
                }`
              }
            >
              {isExpanded && <span className="truncate text-sm">{link.label}</span>}
              {!isExpanded && <span className="w-full text-center text-[10px] tracking-[0.2em] uppercase">{link.label.slice(0, 2)}</span>}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="px-3 py-5 border-t border-black flex-shrink-0">
          <button
            onClick={() => navigate('/order')}
            className={`w-full relative group bg-black text-white font-bold border border-black hover:bg-white hover:text-black transition-all duration-200 overflow-hidden flex items-center justify-center gap-2 ${
              isExpanded ? 'px-4 py-3' : 'p-3'
            }`}
          >
            {isExpanded && <span className="text-sm">New Project</span>}
            {!isExpanded && <span className="text-[10px] tracking-[0.2em] uppercase">New</span>}
          </button>
        </div>

        <div className="px-3 py-5 border-t border-black flex-shrink-0">
          <button 
            onClick={() => navigate('/home/settings')}
            className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-black/5 hover:border-black transition-all duration-200 group min-w-0 border border-transparent ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}>
            <div className="w-9 h-9 border border-black flex items-center justify-center flex-shrink-0 text-black font-bold text-xs">
              U
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-0.5 text-left overflow-hidden min-w-0">
                <span className="text-black text-sm font-bold truncate">User</span>
                <span className="text-black/60 text-xs font-semibold truncate">Profile</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Header - Visible on md and below */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-black backdrop-blur-xl">
        <div className="flex items-center justify-between h-16 px-4 gap-3">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 group flex-1">
            <img 
              src="/logo.jpeg" 
              alt="ThinkNode" 
              className="w-8 h-8 flex-shrink-0 object-cover group-active:scale-95 transition-transform"
            />
            <span className="font-black text-black text-sm tracking-tight leading-tight">ThinkNode</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-black/5 active:bg-black/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-black bg-white px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/home'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all border border-transparent ${
                    isActive
                      ? 'text-white bg-black border-black'
                      : 'text-black/70 hover:text-black hover:bg-black/5 hover:border-black'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
            <button
              onClick={() => {
                navigate('/home/settings');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-black/70 hover:text-black hover:bg-black/5 active:bg-black/10 transition-all border border-transparent hover:border-black"
            >
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                navigate('/order');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 px-4 py-3 flex items-center justify-center gap-2 bg-black text-white font-bold border border-black hover:bg-white hover:text-black active:bg-white transition-all"
            >
              <span>New Project</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
