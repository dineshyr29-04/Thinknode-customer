import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getOrders } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

const STATUS = {
  pending: { label: 'Pending', cls: 'bg-amber-100/50 text-amber-700 border-amber-200/50', dot: 'bg-amber-400' },
  accepted: { label: 'Accepted', cls: 'bg-blue-100/50 text-blue-700 border-blue-200/50', dot: 'bg-blue-500' },
  'in-progress': { label: 'In Progress', cls: 'bg-indigo-100/50 text-indigo-700 border-indigo-200/50', dot: 'bg-indigo-500' },
  review: { label: 'Under Review', cls: 'bg-purple-100/50 text-purple-700 border-purple-200/50', dot: 'bg-purple-500' },
  completed: { label: 'Completed', cls: 'bg-emerald-100/50 text-emerald-700 border-emerald-200/50', dot: 'bg-emerald-500' },
};

const PROGRESS = { pending: 10, accepted: 30, 'in-progress': 60, review: 85, completed: 100 };

function Badge({ status }) {
  const cfg = STATUS[status] || STATUS.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${cfg.cls} backdrop-blur-sm`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      {cfg.label}
    </span>
  );
}

export default function Orders() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchOrders = async (targetEmail) => {
    if (!targetEmail.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getOrders(targetEmail.trim());
      // Sort orders descending by ID or creation (simulated here)
      const sorted = (res.data.orders || []).sort((a, b) => {
        const idA = a._id || a.id || '';
        const idB = b._id || b.id || '';
        return idB.localeCompare(idA);
      });
      setOrders(sorted);
      setSearched(true);
    } catch {
      setError('Could not fetch orders. Please check your email and try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      fetchOrders(user.email);
    }
    if (location.state?.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [user, location.state]);

  const stats = useMemo(() => {
    const total = orders.length;
    const active = orders.filter(o => !['completed'].includes(o.status)).length;
    const completed = orders.filter(o => o.status === 'completed').length;
    return { total, active, completed };
  }, [orders]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders(email);
  };

  return (
    <div className="bg-[#fcfcff] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 py-14 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-3">Customer Portal</p>
              <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Project History
              </h1>
              <p className="text-slate-400 text-sm mt-3 max-w-md leading-relaxed">
                Track your ongoing collaborations and access historical project details in one secure place.
              </p>
            </div>
            {searched && (
              <div className="flex gap-3 md:gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Active</p>
                  <p className="text-2xl font-black text-cyan-400">{stats.active}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Finished</p>
                  <p className="text-2xl font-black text-indigo-400">{stats.completed}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-20 space-y-8">
        {/* Success Alert */}
        {showSuccess && (
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 border border-emerald-400 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-bold">Order received successfully!</p>
                <p className="text-emerald-100 text-xs mt-0.5">We've added it to your history. We'll start reviewing it shortly.</p>
              </div>
            </div>
            <button onClick={() => setShowSuccess(false)} className="opacity-60 hover:opacity-100 p-1">✕</button>
          </div>
        )}

        {/* Search/Email lookup */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/20 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Account Lookup</h2>
              <p className="text-slate-500 text-sm mt-1">Found an order under a different email? Search below.</p>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-80">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">✉️</span>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Sync Orders'}
              </button>
            </form>
          </div>
          {error && <p className="mt-4 text-red-500 text-xs font-bold flex items-center gap-2 bg-red-50 p-3 rounded-xl border border-red-100">⚠️ {error}</p>}
        </div>

        {/* Results */}
        {searched && !loading && (
          orders.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🛸</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No projects found yet</h3>
              <p className="text-slate-500 text-sm mt-2 mb-8 max-w-sm mx-auto leading-relaxed">
                It looks like we don't have any orders linked to this email address. Ready to start something new?
              </p>
              <button
                onClick={() => navigate('/order')}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm tracking-wide"
              >
                Launch New Project →
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Found {orders.length} Project{orders.length !== 1 ? 's' : ''}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {orders.map((order, idx) => {
                  const key = order._id || order.id || `idx-${idx}`;
                  const pct = PROGRESS[order.status] || 10;
                  const isOpen = expanded === key;
                  const isNew = idx === 0 && showSuccess;

                  return (
                    <div
                      key={key}
                      className={`group bg-white rounded-3xl border transition-all duration-500 ${
                        isOpen 
                          ? 'border-indigo-400 shadow-2xl shadow-indigo-500/10 ring-4 ring-indigo-500/5' 
                          : 'border-slate-200/70 hover:border-indigo-300 hover:shadow-xl hover:shadow-slate-200/50'
                      } ${isNew ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
                    >
                      {/* Card Header Content */}
                      <div className="p-1">
                        <button
                          type="button"
                          className="w-full text-left p-6 sm:p-8 focus:outline-none"
                          onClick={() => setExpanded(isOpen ? null : key)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                  {order.projectTitle || order.project_title}
                                </h3>
                                {isNew && <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">JUST ADDED</span>}
                              </div>
                              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                {(order.serviceType || order.service_type)?.replace(/-/g, ' ').toUpperCase()}
                              </p>
                            </div>
                            <Badge status={order.status || 'pending'} />
                          </div>

                          {/* Progress Visual */}
                          <div className="mt-8 relative">
                            <div className="flex justify-between items-center mb-2.5">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workflow Timeline</span>
                              <span className="text-sm font-black text-indigo-600">{pct}%</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                              <div
                                className={`h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 rounded-full transition-all duration-1000 ease-out`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-1 px-1">
                              {[1,2,3,4,5].map(i => (
                                <div key={i} className={`h-1 rounded-full ${pct >= i*20 ? 'bg-indigo-200' : 'bg-slate-100'}`} />
                              ))}
                            </div>
                          </div>

                          {/* Snapshot Meta */}
                          <div className="flex flex-wrap items-center gap-6 mt-8">
                            <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                              <span className="text-xs">💰</span>
                              <span className="text-xs font-bold">${order.budget || '0'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                              <span className="text-xs">📅</span>
                              <span className="text-xs font-bold">{order.deadline || 'TBD'}</span>
                            </div>
                            {order.files?.length > 0 && (
                              <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                                <span className="text-xs">📎</span>
                                <span className="text-xs font-bold">{order.files.length} Assets</span>
                              </div>
                            )}
                          </div>
                        </button>

                        {/* Expanded details */}
                        {isOpen && (
                          <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="h-px bg-slate-100 mb-8" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                                    Project Scope & Requirements
                                  </h4>
                                  <p className="text-slate-600 text-sm leading-relaxed bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50 italic">
                                    &quot;{order.description}&quot;
                                  </p>
                                </div>
                                
                                {order.customization && Object.keys(order.customization).length > 0 && (
                                  <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                      Configuration Details
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                      {Object.entries(order.customization).map(([k, v]) => (
                                        <div key={k} className="bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm">
                                          <p className="text-[10px] text-slate-400 font-bold uppercase">{k}</p>
                                          <p className="text-slate-800 font-bold text-sm mt-0.5">{v}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="space-y-6">
                                {order.message ? (
                                  <div className="bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">💬</div>
                                     <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-4">
                                      Latest Update from Expert
                                    </h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">{order.message}</p>
                                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                                       <div className="flex -space-x-2">
                                          {[1,2].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />
                                          ))}
                                       </div>
                                       <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Open Message Center →</button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-10 text-center">
                                    <p className="text-slate-400 text-xs font-bold tracking-wide">Waiting for project assignment...</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* Empty state hint */}
        {!searched && (
          <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center shadow-xl shadow-slate-200/10">
             <div className="text-4xl mb-4">🔭</div>
            <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
              Authenticate your project access by entering your primary contact email. This will synchronize all historical and active projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

