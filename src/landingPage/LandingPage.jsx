import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-black text-sm">TN</span>
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">ThinkNode</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">Home</a>
            <a href="#services" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">Services</a>
            <a href="#portfolio" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">Portfolio</a>
            <a href="#contact" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">Contact</a>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-md"
            >
              Start Project
            </button>
          </div>

          <button className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => (
    <section className="pt-32 pb-24 bg-gradient-to-br from-slate-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
            Build, Design, and Automate Your
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">Digital Projects</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Professional web development, design, and automation services delivered quickly. Get production-ready results in days, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg text-base"
            >
              Start a Project →
            </button>
            <button
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-slate-600 hover:border-slate-400 text-slate-200 font-semibold rounded-xl transition-all text-base"
            >
              View Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const ServicesSection = () => {
    const services = [
      { icon: '🌐', title: 'Web Development', description: 'Custom websites and web apps built with modern technologies.' },
      { icon: '⚛️', title: 'Frontend Applications', description: 'Interactive and responsive user interfaces that engage users.' },
      { icon: '🎨', title: 'E-Poster Design', description: 'Eye-catching digital posters and marketing materials.' },
      { icon: '⚙️', title: 'n8n Automation', description: 'Workflow automation to save time and reduce manual work.' },
      { icon: '🎬', title: 'Video Editing', description: 'Professional video editing for social media and marketing.' },
    ];

    return (
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Services</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">Everything You Need</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Comprehensive services to bring your digital projects to life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-slate-800 font-bold text-base mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <button
                  onClick={() => navigate('/login')}
                  className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors"
                >
                  Order Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const HowItWorks = () => (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Process</p>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-500 text-lg">Simple and transparent process from start to finish.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: '01', icon: '📝', title: 'Submit Project Details', desc: 'Tell us about your project, requirements, and deadline.' },
            { num: '02', icon: '⚙️', title: 'Work Begins with Updates', desc: 'We get to work with daily progress updates.' },
            { num: '03', icon: '🚀', title: 'Receive Final Product', desc: 'Get production-ready deliverables you can ship immediately.' },
          ].map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex flex-col items-center justify-center mx-auto mb-6 text-white">
                <span className="text-2xl">{step.icon}</span>
                <span className="text-xs font-black mt-1">{step.num}</span>
              </div>
              <h3 className="text-slate-800 font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const PortfolioSection = () => (
    <section id="portfolio" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Portfolio</p>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">Recent Projects</h2>
          <p className="text-slate-500 text-lg">See what we've built for our clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'E-Commerce Platform', category: 'Web Development', desc: 'Full-featured online store with payment integration.' },
            { title: 'SaaS Dashboard', category: 'Frontend App', desc: 'Real-time analytics dashboard for data visualization.' },
            { title: 'Marketing Campaign', category: 'Design', desc: 'Digital posters and social media assets.' },
          ].map((project, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <span className="text-6xl">📦</span>
              </div>
              <div className="p-6">
                <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">{project.category}</p>
                <h3 className="text-slate-800 font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-slate-500 text-sm">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-20 lg:py-28 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">Features</p>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">Why Choose ThinkNode</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">We deliver excellence in every project we undertake.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { icon: '⚡', title: 'Fast Delivery', desc: 'Get your project ready in days.' },
            { icon: '🎯', title: 'Quality Focus', desc: 'Professional and polished results.' },
            { icon: '💰', title: 'Affordable', desc: 'Competitive pricing without compromise.' },
            { icon: '💬', title: 'Communication', desc: 'Clear updates every step of the way.' },
            { icon: '✨', title: 'Custom Solutions', desc: 'Tailored to your unique needs.' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 text-center">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-bold text-base mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">What Clients Say</h2>
          <p className="text-slate-500 text-lg">Real feedback from real clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah K.', role: 'Startup Founder', text: 'ThinkNode delivered my website ahead of schedule. Quality was exceptional.' },
            { name: 'Marcus T.', role: 'Marketing Manager', text: 'The designs transformed our campaign. Engagement increased significantly.' },
            { name: 'Julia R.', role: 'Operations Lead', text: 'Automations saved our team countless hours. Highly recommend.' },
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-8">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400">★</span>)}
              </div>
              <p className="text-slate-600 mb-6">"{testimonial.text}"</p>
              <div>
                <p className="text-slate-800 font-bold text-sm">{testimonial.name}</p>
                <p className="text-slate-400 text-xs">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const CallToAction = () => (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-indigo-600 to-indigo-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Ready to Start Your Project?</h2>
        <p className="text-xl text-indigo-100 mb-10">Submit your project brief in under 5 minutes.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg text-lg"
        >
          Start Your Project →
        </button>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">TN</span>
              </div>
              <span className="text-white font-bold text-lg">ThinkNode</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional freelance services delivered with precision and quality.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Design</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Automation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Video Editing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">About</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-slate-500">© {new Date().getFullYear()} ThinkNode. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <PortfolioSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
