import { useParams, useNavigate, Link } from 'react-router-dom';
import { getServiceById } from '../data/services';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id);

  if (!service) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Service not found</h2>
        <p className="text-slate-500 mb-6">That service doesn't exist.</p>
        <button
          onClick={() => navigate('/services')}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <div
        className={`bg-gradient-to-br ${service.color} py-20 px-4 text-center text-white`}
      >
        <div className="text-6xl mb-4">{service.icon}</div>
        <h1 className="text-5xl font-black mb-3">{service.title}</h1>
        <p className="text-white/80 text-xl max-w-2xl mx-auto">{service.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-8 justify-center">
          <div className="text-center">
            <p className="text-3xl font-black">{service.startingPrice}</p>
            <p className="text-white/70 text-sm">Starting price</p>
          </div>
          <div className="w-px bg-white/20 self-stretch" />
          <div className="text-center">
            <p className="text-3xl font-black">{service.deliveryTime}</p>
            <p className="text-white/70 text-sm">Estimated delivery</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">About this Service</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{service.description}</p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-5">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl"
                  >
                    <span className="text-emerald-500 font-bold text-lg">✓</span>
                    <span className="text-slate-700 font-medium text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing tiers */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Pricing Tiers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {service.tiers.map((tier, i) => (
                  <div
                    key={tier.name}
                    className={`rounded-2xl p-7 border-2 transition-all ${
                      i === 1
                        ? 'border-indigo-300 bg-indigo-50 shadow-lg shadow-indigo-100'
                        : 'border-gray-100 bg-white'
                    }`}
                  >
                    {i === 1 && (
                      <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-slate-800 font-bold text-lg">{tier.name}</h3>
                    <div className="text-3xl font-black text-indigo-600 my-3">{tier.price}</div>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-emerald-500 font-bold mt-0.5">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate(`/order?service=${service.id}`)}
                      className={`w-full py-3 font-semibold rounded-xl text-sm transition-colors ${
                        i === 1
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to start?</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Fill out our order form and we'll respond within 24 hours.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/order?service=${service.id}`)}
                  className={`w-full py-3.5 bg-gradient-to-r ${service.color} text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md`}
                >
                  Order This Service
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-3.5 border border-gray-200 text-slate-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Ask a Question
                </button>
              </div>

              <div className="mt-7 pt-7 border-t border-gray-100 space-y-3.5">
                {[
                  ['📅', 'Delivery', service.deliveryTime],
                  ['💰', 'Starting from', service.startingPrice],
                  ['🔄', 'Revisions', 'Included'],
                  ['🔒', 'Privacy', 'Secure & private'],
                ].map(([icon, lbl, val]) => (
                  <div key={lbl} className="flex items-center gap-2.5 text-sm text-slate-500">
                    <span>{icon}</span>
                    <span>{lbl}:</span>
                    <strong className="text-slate-700 ml-auto">{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors text-sm"
          >
            ← Back to all services
          </Link>
        </div>
      </div>
    </div>
  );
}
