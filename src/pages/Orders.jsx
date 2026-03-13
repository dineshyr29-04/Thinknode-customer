import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../api/apiClient';

const STATUS = {
  pending: { label: 'Pending', cls: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-400' },
  accepted: { label: 'Accepted', cls: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  'in-progress': { label: 'In Progress', cls: 'bg-indigo-100 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
  review: { label: 'Under Review', cls: 'bg-purple-100 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  completed: { label: 'Completed', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
};

const PROGRESS = { pending: 10, accepted: 30, 'in-progress': 60, review: 85, completed: 100 };

function Badge({ status }) {
  const cfg = STATUS[status] || STATUS.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function Orders() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getOrders(email.trim());
      setOrders(res.data.orders || []);
      setSearched(true);
    } catch {
      setError('Could not fetch orders. Please check your email and try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-950 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-3xl font-black">My Orders</h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Track your projects, check status, and see what&apos;s in progress.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        {/* Email lookup */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Look up your orders</h2>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter the email you used when ordering…"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 flex-shrink-0"
            >
              {loading ? 'Searching…' : 'Search'}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-red-500 text-sm flex items-center gap-2">
              ⚠️ {error}
            </p>
          )}
        </div>

        {/* Results */}
        {searched && !loading && (
          orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <div className="text-5xl mb-3">📭</div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No orders found</h3>
              <p className="text-slate-400 text-sm mb-6">
                No orders are linked to that email address.
              </p>
              <button
                onClick={() => navigate('/order')}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm"
              >
                Place your first order →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-500 text-sm">
                {orders.length} order{orders.length !== 1 ? 's' : ''} found
              </p>

              {orders.map((order) => {
                const key = order._id || order.id;
                const pct = PROGRESS[order.status] || 10;
                const isOpen = expanded === key;

                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Card header — clickable */}
                    <button
                      type="button"
                      className="w-full text-left p-6 focus:outline-none"
                      onClick={() => setExpanded(isOpen ? null : key)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-slate-800 font-bold text-lg leading-tight">
                            {order.projectTitle}
                          </h3>
                          <p className="text-slate-500 text-sm mt-0.5 capitalize">
                            {order.serviceType?.replace(/-/g, ' ')}
                          </p>
                        </div>
                        <Badge status={order.status || 'pending'} />
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-slate-400">Progress</span>
                          <span className="text-xs font-bold text-indigo-600">{pct}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {/* Meta chips */}
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
                        {order.budget && <span>💰 ${order.budget}</span>}
                        {order.deadline && <span>📅 Due {order.deadline}</span>}
                        {order.files?.length > 0 && (
                          <span>📎 {order.files.length} file{order.files.length !== 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </button>

                    {/* Expanded details */}
                    {isOpen && (
                      <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-4">
                        {order.description && (
                          <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              Description
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {order.description}
                            </p>
                          </div>
                        )}

                        {order.customization &&
                          Object.keys(order.customization).length > 0 && (
                            <div>
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Customization
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(order.customization).map(([k, v]) => (
                                  <span
                                    key={k}
                                    className="bg-white border border-gray-200 text-xs text-slate-600 px-3 py-1 rounded-full"
                                  >
                                    {k}: {v}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        {order.message && (
                          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5">
                              Message from Freelancer
                            </h4>
                            <p className="text-slate-600 text-sm">{order.message}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* Empty state hint */}
        {!searched && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
            <p className="text-indigo-600 text-sm">
              Enter the email address you used when placing your order to view all your projects and their current status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
