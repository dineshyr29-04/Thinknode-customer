import { Link, useNavigate } from 'react-router-dom';
import { SERVICES } from '../data/services';

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'On-Time Delivery' },
  { value: '< 24h', label: 'Response Time' },
  { value: '5★', label: 'Avg Rating' },
];

const STEPS = [
  { n: '01', icon: '🔍', title: 'Choose Your Service', body: 'Browse our catalog and pick the service that fits your project best.' },
  { n: '02', icon: '📋', title: 'Customize & Submit', body: 'Fill in project details, add customizations, and upload reference files.' },
  { n: '03', icon: '⚙️', title: 'We Build It', body: 'Your project is built with care and daily progress updates.' },
  { n: '04', icon: '🚀', title: 'Review & Deliver', body: 'Refine with feedback and receive production-ready deliverables.' },
];

const TESTIMONIALS = [
  { name: 'Sarah K.', role: 'Startup Founder', company: 'NovaPay', text: 'ThinkNode delivered my website ahead of schedule. The quality was far beyond what I expected — clean code, great design, and top-notch communication throughout.', initials: 'SK', gradient: 'from-indigo-500 to-cyan-500' },
  { name: 'Marcus T.', role: 'Marketing Manager', company: 'BoltMedia', text: "The e-poster designs transformed our campaign. Engagement went up 3× compared to our previous materials. We'll use ThinkNode for all future creative work.", initials: 'MT', gradient: 'from-pink-500 to-rose-500' },
  { name: 'Julia R.', role: 'Operations Lead', company: 'FlowStack', text: "The n8n automations saved our team 20+ hours every week. Every workflow is documented, tested, and runs flawlessly. Couldn't recommend more.", initials: 'JR', gradient: 'from-amber-500 to-orange-500' },
];

const PILLARS = [
  { icon: '⚡', title: 'Fast Turnaround', body: 'Optimised delivery pipelines mean your project ships in days, not months.' },
  { icon: '🎯', title: 'Direct Communication', body: 'No middlemen or ticket queues — talk directly to the person building your project.' },
  { icon: '✅', title: 'Production-Ready Output', body: 'Tested, documented, and deployable from day one. Zero hand-holding required.' },
  { icon: '🔒', title: 'Secure & Private', body: 'Your files, ideas, and project details are handled with full confidentiality.' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for new projects
            </div>
            <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] mb-6">
              Freelance<br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                Services You<br />Can Trust.
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
              Web development, design, automation, and video editing — all under one roof.
              Submit a project in minutes and get production-ready results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/order')}
                className="group relative px-7 py-3.5 backdrop-blur-md bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 text-white font-bold rounded-2xl border border-white/40 hover:border-white/60 transition-all duration-300 overflow-hidden text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative">Start a Project →</span>
              </button>
              <button
                onClick={() => navigate('/services')}
                className="px-7 py-3.5 backdrop-blur-md bg-white/10 border border-white/30 text-white/90 font-semibold rounded-2xl hover:bg-white/15 hover:border-white/50 transition-all duration-300 text-sm"
              >
                Explore Services
              </button>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['SK', 'MT', 'JR'].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold">{i}</div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}</div>
                <p className="text-slate-400 text-xs mt-0.5">Trusted by 50+ clients</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <Link key={s.id} to={`/services/${s.id}`} className={`group bg-gradient-to-br ${s.color} p-0.5 rounded-2xl hover:scale-[1.02] transition-transform`}>
                <div className="bg-slate-900 rounded-[14px] p-5 h-full flex flex-col gap-3">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <p className="text-white font-bold text-sm">{s.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{s.tagline}</p>
                  </div>
                  <p className="text-indigo-400 font-bold text-sm mt-auto">{s.startingPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="relative border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-800">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center px-4 first:pl-0">
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-slate-500 text-xs mt-0.5 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Services</p>
              <h2 className="text-4xl font-black text-slate-900">Everything you need</h2>
            </div>
            <Link to="/services" className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors flex items-center gap-1 flex-shrink-0">View all services →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all group flex flex-col">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-105 transition-transform`}>{s.icon}</div>
                <h3 className="text-slate-800 font-bold text-base mb-1">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-4">{s.tagline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-600 font-black text-sm">{s.startingPrice}</span>
                  <Link to={`/services/${s.id}`} className="text-xs text-slate-400 hover:text-indigo-600 transition-colors font-medium">Details →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Process</p>
            <h2 className="text-4xl font-black text-slate-900">How ThinkNode Works</h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">A simple, transparent process from enquiry to delivery.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-indigo-100 shadow-md flex flex-col items-center justify-center mx-auto mb-5">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">{s.n}</span>
                </div>
                <h3 className="text-slate-800 font-bold text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ThinkNode */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">Why us</p>
              <h2 className="text-4xl font-black text-white mb-5 leading-tight">Built for clients<br />who value their time.</h2>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-md">No agency overhead. No guesswork. Just clear timelines, direct communication, and deliverables you can ship immediately.</p>
              <button onClick={() => navigate('/order')} className="group relative px-7 py-3.5 backdrop-blur-md bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 text-white font-bold rounded-2xl border border-white/40 hover:border-white/60 transition-all duration-300 overflow-hidden text-sm"><div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div><span className="relative">Start a Project Today →</span></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map((p) => (
                <div key={p.title} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                  <span className="text-2xl mb-3 block">{p.icon}</span>
                  <h3 className="text-white font-bold text-sm mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Client Stories</p>
            <h2 className="text-4xl font-black text-slate-900">Trusted. Proven. Reliable.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex gap-0.5 mb-5">{[...Array(5)].map((_, i) => <span key={i} className="text-amber-400">★</span>)}</div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-7">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} text-white text-sm font-black flex items-center justify-center flex-shrink-0`}>{t.initials}</div>
                  <div>
                    <p className="text-slate-800 font-bold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-14 overflow-hidden relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to get started?</h2>
              <p className="text-indigo-200 text-lg mb-8">Submit your project brief in under 5 minutes.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => navigate('/order')} className="group relative px-8 py-4 backdrop-blur-md bg-white/20 text-white font-black rounded-2xl border border-white/40 hover:bg-white/30 hover:border-white/60 transition-all duration-300 shadow-lg text-sm overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div><span className="relative">Start a Project →</span></button>
                <button onClick={() => navigate('/contact')} className="px-8 py-4 border border-indigo-400/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm">Ask a Question</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
