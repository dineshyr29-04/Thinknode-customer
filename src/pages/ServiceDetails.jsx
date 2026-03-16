import { Link, useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../data/services';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id);

  if (!service) {
    return (
      <div className="text-center px-4">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Service not found</h2>
        <p className="text-slate-500 mb-6">The service you are looking for does not exist.</p>
        <Link to="/services" className="text-indigo-600 font-semibold hover:underline">Back to Services →</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className={`bg-gradient-to-br ${service.color}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white font-semibold">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-end pb-14">
            <div>
              <span className="text-6xl block mb-4">{service.icon}</span>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">{service.title}</h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">{service.tagline}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-white/70 text-xs uppercase tracking-wide">Starting from</p>
                  <p className="text-white font-black text-xl">{service.startingPrice}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-white/70 text-xs uppercase tracking-wide">Delivery</p>
                  <p className="text-white font-black text-xl">{service.deliveryTime}</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-xs w-full">
                <h3 className="text-white font-bold text-base mb-4">What&apos;s included</h3>
                <ul className="space-y-2">
                  {service.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-white/80 font-black text-xs mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-white/70 text-sm">{f}</span>
                    </li>
                  ))}
                  {service.features.length > 5 && (
                    <li className="text-white/50 text-xs">+{service.features.length - 5} more</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-[1fr_320px] gap-10">
        {/* Left */}
        <div className="space-y-10">
          {/* Description */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">About this service</h2>
            <p className="text-slate-600 leading-relaxed">{service.description}</p>
          </section>

          {/* All features */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-5">What you get</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((f) => (
                <div key={f} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="text-emerald-500 font-black text-xs mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-slate-700 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing tiers */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-5">Pricing Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {service.tiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl border-2 p-7 flex flex-col ${
                    i === 1
                      ? 'border-indigo-500 shadow-lg shadow-indigo-100 relative'
                      : 'border-gray-100'
                  }`}
                >
                  {i === 1 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full">Most Popular</span>
                  )}
                  <div className="mb-5">
                    <p className="text-slate-800 font-black text-lg">{tier.name}</p>
                    <p className="text-3xl font-black text-slate-900 mt-1">{tier.price}</p>
                  </div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-black text-xs mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-slate-600 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate(`/order?service=${service.id}`)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                      i === 1
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'border border-gray-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: sticky CTA sidebar */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
            <h3 className="text-slate-900 font-black text-base mb-1">Ready to order?</h3>
            <p className="text-slate-500 text-sm mb-6">Place your order now and get started within 24 hours.</p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Starting price</span>
                <span className="text-slate-800 font-black">{service.startingPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Delivery</span>
                <span className="text-slate-800 font-semibold">{service.deliveryTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Revisions</span>
                <span className="text-slate-800 font-semibold">Included</span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/order?service=${service.id}`)}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors mb-3"
            >
              Order This Service →
            </button>
            <Link
              to="/contact"
              className="block text-center w-full py-3 border border-gray-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 font-semibold rounded-xl text-sm transition-colors"
            >
              Ask a Question
            </Link>
          </div>

          {/* Back */}
          <div className="mt-4 text-center">
            <Link to="/services" className="text-sm text-slate-400 hover:text-indigo-600 transition-colors">← Back to all services</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
