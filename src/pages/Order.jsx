import { useSearchParams } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import { useOrder } from '../context/OrderContext';

export default function Order() {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get('service') || '';
  const { error } = useOrder();

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 py-16 px-4 text-center">
        <h1 className="text-5xl font-black text-white mb-3">Place an Order</h1>
        <p className="text-slate-300 text-xl max-w-xl mx-auto">
          Tell us what you need and we'll bring it to life — fast and with precision.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm flex items-start gap-2">
            <span className="mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <OrderForm defaultService={defaultService} />
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">
          By submitting this form you agree to our{' '}
          <a href="#" className="text-indigo-500 hover:underline">Terms of Service</a>.
        </p>
      </div>
    </div>
  );
}
