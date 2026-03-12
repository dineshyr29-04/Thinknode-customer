import { useNavigate, Link } from 'react-router-dom';
import { SERVICES } from '../data/services';

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 py-20 px-4 text-center">
        <h1 className="text-5xl font-black text-white mb-4">Our Services</h1>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto">
          From websites to automation workflows — everything designed to move your business forward.
        </p>
      </div>

      {/* Services list */}
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-10">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Gradient bar */}
            <div className={`h-2 bg-gradient-to-r ${service.color}`} />

            <div className="p-8 md:p-10">
              {/* Title row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}
                >
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-slate-800">{service.title}</h2>
                  <p className="text-slate-500 mt-1">{service.tagline}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Starting at</p>
                  <p className="text-3xl font-black text-indigo-600">{service.startingPrice}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Delivery: {service.deliveryTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description + Features */}
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  <div>
                    <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
                      What's included
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="text-emerald-500 font-bold">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing tiers */}
                <div>
                  <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
                    Pricing Tiers
                  </h3>
                  <div className="space-y-3">
                    {service.tiers.map((tier) => (
                      <div
                        key={tier.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <span className="text-sm font-semibold text-slate-700">{tier.name}</span>
                        <span className="text-indigo-600 font-bold text-sm">{tier.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="sm:hidden">
                  <p className="text-xs text-slate-400">Starting at</p>
                  <p className="text-2xl font-black text-indigo-600">{service.startingPrice}</p>
                  <p className="text-xs text-slate-500">Delivery: {service.deliveryTime}</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/services/${service.id}`}
                    className="px-5 py-2.5 border border-indigo-200 text-indigo-600 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors"
                  >
                    Full Details
                  </Link>
                  <button
                    onClick={() => navigate(`/order?service=${service.id}`)}
                    className={`px-6 py-2.5 bg-gradient-to-r ${service.color} text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity shadow-md`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Custom quote CTA */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Need something custom?</h2>
          <p className="text-slate-500 mb-6 max-w-lg mx-auto">
            Describe your project and we'll put together a custom quote tailored just for you.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
          >
            Get a Custom Quote
          </button>
        </div>
      </div>
    </div>
  );
}
