import { Link, useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../data/services';

const STEPS = [
  {
    step: '01',
    title: 'Choose a Service',
    desc: 'Browse our services and find exactly what your project needs.',
  },
  {
    step: '02',
    title: 'Customize & Order',
    desc: 'Fill in your requirements, add customizations, and upload references.',
  },
  {
    step: '03',
    title: 'Track & Receive',
    desc: 'Monitor your project progress and receive it on time.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    role: 'Startup Founder',
    text: 'ThinkNode delivered my website in just 10 days. The quality was absolutely exceptional — far beyond what I expected.',
    avatar: 'SK',
  },
  {
    name: 'Marcus T.',
    role: 'Marketing Manager',
    text: "The e-poster designs were stunning. Our campaign engagement tripled compared to last quarter's results.",
    avatar: 'MT',
  },
  {
    name: 'Julia R.',
    role: 'Operations Lead',
    text: "The n8n automations saved us 20+ hours a week. Every workflow works flawlessly. Couldn't be happier.",
    avatar: 'JR',
  },
];

const WHY = [
  {
    icon: '⚡',
    title: 'Fast Delivery',
    desc: 'Optimised workflows mean your project ships in days, not weeks or months.',
  },
  {
    icon: '✅',
    title: 'Production Ready',
    desc: 'Every deliverable is tested, documented, and ready to deploy from day one.',
  },
  {
    icon: '🤝',
    title: 'Direct Communication',
    desc: 'Work directly with the builder — no middlemen, no ticket queues.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="pt-16">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-28 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-2 rounded-full mb-8 backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new projects
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Build Anything,
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Ship Fast.
            </span>
          </h1>

          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional web development, design, and automation services delivered with
            precision. No agency fluff — just results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/order')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-2xl shadow-indigo-900"
            >
              Start a Project →
            </button>
            <button
              onClick={() => navigate('/services')}
              className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
            >
              Browse Services
            </button>
          </div>

          {/* Stats bar */}
          <div className="mt-16 flex flex-wrap gap-10 justify-center">
            {[
              ['50+', 'Projects Delivered'],
              ['100%', 'Client Satisfaction'],
              ['< 48 h', 'Average Response Time'],
            ].map(([num, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="text-3xl font-black text-white">{num}</div>
                <div className="text-slate-400 text-sm mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-800 mb-3">How It Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              From idea to delivery in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="relative text-center group">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-indigo-200 to-transparent" />
                )}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                  {s.step}
                </div>
                <h3 className="text-slate-800 font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Services ───── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-800 mb-3">Services</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Everything you need to build, design, and automate your business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              View full service details →
            </Link>
          </div>
        </div>
      </section>

      {/* ───── Why ThinkNode ───── */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-3">Why ThinkNode?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We don't just deliver files — we deliver working solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY.map((f) => (
              <div
                key={f.title}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center hover:border-indigo-600/50 transition-colors"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-800 mb-3">What Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA Banner ───── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4">
                Ready to start your project?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Tell us what you need — we'll make it happen.
              </p>
              <button
                onClick={() => navigate('/order')}
                className="px-10 py-4 bg-white text-indigo-600 font-bold text-lg rounded-2xl hover:bg-gray-50 transition-colors shadow-xl"
              >
                Start a Project →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
