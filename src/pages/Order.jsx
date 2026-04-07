import { useSearchParams, Link } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import { useOrder } from '../context/OrderContext';
import { getServiceById } from '../data/services';

export default function Order() {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get('service') || '';
  const { error } = useOrder();
  const service = defaultService ? getServiceById(defaultService) : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-950 text-white py-12 px-4 border-b border-slate-800 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {service && (
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-4xl flex-shrink-0 shadow-2xl border border-white/20`}>
                {service.icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-indigo-500 text-white">New Order</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-slate-400 text-xs font-medium">Step 1 of 1</span>
              </div>
              <h1 className="text-4xl font-black tracking-tight">
                {service ? `Configure ${service.title}` : 'Start Your Project'}
              </h1>
              <p className="text-slate-400 text-base mt-2 max-w-xl leading-relaxed">
                {service
                  ? `Launch your ${service.title.toLowerCase()} journey. We'll handle the technical heavy lifting while you focus on the vision.`
                  : 'Fill in your project details below. Our expert team will review your requirements and get back to you within 24 hours.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm flex items-start gap-2">
            <span className="mt-0.5 flex-shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <OrderForm defaultService={defaultService} />
          </div>

          {/* Info sidebar */}
          <div className="space-y-6 ">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm top-6 sticky">
              <h3 className="text-slate-900 font-black text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Execution Roadmap
              </h3>
              <ol className="space-y-6">
                {[
                  { t: 'Strategic Review', d: 'Order analyzed by lead architects' },
                  { t: 'Secure Kickoff', d: 'Dedicated workspace initialization' },
                  { t: 'Active Development', d: 'Real-time progress via dashboard' },
                  { t: 'Quality Assurance', d: 'Rigorous testing & final delivery' }
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-lg bg-slate-50 text-slate-400 text-[10px] font-black flex items-center justify-center flex-shrink-0 border border-slate-100 uppercase">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-slate-800 font-bold text-xs leading-none mb-1">{step.t}</p>
                      <p className="text-slate-500 text-[11px] leading-tight">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-indigo-600 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                  <div className="text-xl">✨</div>
                  <p className="text-[11px] font-bold leading-snug">
                    You're protected by our <br />
                    <span className="text-indigo-700 uppercase tracking-widest text-[9px]">100% Satisfaction Guarantee</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group sticky">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/30 transition-colors" />
              <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">Need Help?</p>
              <h4 className="font-bold text-base mb-2">Custom Requirements?</h4>
              <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                If your project doesn't fit these categories, talk to our solutions team.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-black text-white hover:text-indigo-300 transition-colors">
                Book a Consultation <span>→</span>
              </Link>
            </div>

            <p className="text-slate-400 text-[10px] text-center px-4 leading-relaxed uppercase tracking-widest font-bold sticky">
              Secure Checkout · Data Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
