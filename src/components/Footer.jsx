import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  Services: [
    { label: 'Web Development', path: '/services/web-development' },
    { label: 'Frontend Applications', path: '/services/frontend-app' },
    { label: 'E-Poster Design', path: '/services/e-poster-design' },
    { label: 'n8n Automation', path: '/services/n8n-automation' },
  ],
  Company: [
    { label: 'Home', path: '/' },
    { label: 'All Services', path: '/services' },
    { label: 'Place an Order', path: '/order' },
    { label: 'Contact Us', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">TN</span>
              </div>
              <span className="text-white font-bold text-lg">ThinkNode Client Portal</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Professional freelance services delivered with precision. Web development,
              design, and automation — all in one place.
            </p>
            <div className="mt-6 flex gap-3">
                  <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center group"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 3.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 5.5zM18 6.25a1.25 1.25 0 1 1-1.25-1.25A1.25 1.25 0 0 1 18 6.25zM12 9.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5z" />
                  </svg>
                </a>
              <a
                href="https://www.linkedin.com/company/110646079/admin/dashboard/"
                target="_blank"
                className="w-9 h-9 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center group"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ThinkNode Client Portal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
