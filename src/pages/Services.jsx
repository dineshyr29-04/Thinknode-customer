import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';

export default function Services() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Page header */}
      <div className="bg-slate-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">Catalog</p>
          <h1 className="text-4xl font-black mb-3">Services</h1>
          <p className="text-slate-400 text-base max-w-xl">
            Professional freelance services built for speed, quality, and real-world results.
          </p>
        </div>
      </div>

      {/* Services list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {SERVICES.map((s) => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="grid md:grid-cols-[280px_1fr_220px] divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {/* Left: identity */}
                <div className={`bg-gradient-to-br ${s.color} p-8 flex flex-col justify-center`}>
                  <span className="text-5xl mb-4 block">{s.icon}</span>
                  <h2 className="text-white font-black text-xl mb-1">{s.title}</h2>
                  <p className="text-white/70 text-sm leading-relaxed">{s.tagline}</p>
                </div>

                {/* Middle: features */}
                <div className="p-8">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{s.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-px text-xs font-black flex-shrink-0">✓</span>
                        <span className="text-slate-600 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: pricing + CTA */}
                <div className="p-8 flex flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Starting from</p>
                    <p className="text-3xl font-black text-slate-900">{s.startingPrice}</p>
                    <p className="text-slate-500 text-xs mt-1">⏱ {s.deliveryTime}</p>
                  </div>

                  {/* Mini tiers */}
                  <div className="space-y-2">
                    {s.tiers.map((tier) => (
                      <div key={tier.name} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                        <span className="text-slate-700 text-sm font-semibold">{tier.name}</span>
                        <span className="text-slate-900 font-black text-sm">{tier.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/order?service=${s.id}`}
                      className="block text-center py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors"
                    >
                      Order Now
                    </Link>
                    <Link
                      to={`/services/${s.id}`}
                      className="block text-center py-2.5 border border-gray-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 font-semibold rounded-xl text-sm transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom quote */}
        <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-slate-900 font-black text-lg mb-1">Need something custom?</h3>
            <p className="text-slate-500 text-sm">Not sure which service fits? Get a free quote tailored to your project.</p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-indigo-200"
          >
            Request Custom Quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
