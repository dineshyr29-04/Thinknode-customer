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
      <div className="bg-slate-950 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300">Place Order</span>
          </nav>
          <div className="flex items-center gap-5">
            {service && (
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                {service.icon}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-black">
                {service ? `Order: ${service.title}` : 'Place an Order'}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {service
                  ? `Starting from ${service.startingPrice} · ${service.deliveryTime} delivery`
                  : 'Fill in your project details below and we will get started within 24 hours.'}
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
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-slate-800 font-bold text-sm mb-4">What happens next?</h3>
              <ol className="space-y-3">
                {['Your order is reviewed within 2 hours', 'You receive a confirmation email with details', 'Work begins within 24 hours of confirmation', 'Daily updates until delivery'].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-slate-600 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <p className="text-indigo-700 font-bold text-sm mb-1">💬 Questions?</p>
              <p className="text-indigo-600 text-xs mb-3">Not sure what to pick? We can help.</p>
              <Link to="/contact" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2">Contact us →</Link>
            </div>
            <p className="text-slate-400 text-xs text-center">
              By submitting you agree to our{' '}
              <a href="#" className="text-indigo-500 hover:underline">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
