import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizationPanel from './CustomizationPanel';
import FileUpload from './FileUpload';
import { useOrder } from '../context/OrderContext';
import { submitOrder, uploadFiles } from '../api/apiClient';
import { SERVICES } from '../data/services';

const inp =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition-colors bg-white';
const lbl = 'block text-sm font-medium text-slate-700 mb-1.5';

function StepBadge({ n }) {
  return (
    <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
      {n}
    </span>
  );
}

export default function OrderForm({ defaultService = '' }) {
  const navigate = useNavigate();
  const { updateOrder, resetOrder, setLoading, loading, setError, error } = useOrder();

  const [form, setForm] = useState({
    customerName: '',
    email: '',
    serviceType: defaultService,
    projectTitle: '',
    description: '',
    budget: '',
    deadline: '',
    customization: {},
    files: [],
  });

  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = 'Full name is required.';
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = 'A valid email address is required.';
    if (!form.serviceType) e.serviceType = 'Please select a service.';
    if (!form.projectTitle.trim()) e.projectTitle = 'Project title is required.';
    if (!form.description.trim() || form.description.length < 20)
      e.description = 'Please describe your project (at least 20 characters).';
    if (!form.budget) e.budget = 'Please enter your budget.';
    if (!form.deadline) e.deadline = 'Please select a deadline.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      let uploadedFiles = [];
      if (form.files.length > 0) {
        const fd = new FormData();
        form.files.forEach((f) => fd.append('files', f));
        const res = await uploadFiles(fd);
        uploadedFiles = res.data.files || [];
      }

      const payload = {
        customerName: form.customerName,
        email: form.email,
        serviceType: form.serviceType,
        projectTitle: form.projectTitle,
        description: form.description,
        customization: form.customization,
        files: uploadedFiles,
        budget: form.budget,
        deadline: form.deadline,
      };

      await submitOrder(payload);
      updateOrder(payload);
      resetOrder();
      setDone(true);
      setTimeout(() => navigate('/orders'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Order Submitted!</h2>
        <p className="text-slate-500">
          You'll hear from us within 24 hours. Redirecting to your orders…
        </p>
      </div>
    );
  }

  const stepNum = (n) => (form.serviceType ? n : n - 1);

  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
      {/* ── Step 1: Customer info ── */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-3">
          <StepBadge n="1" /> Your Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Full Name *</label>
            <input
              type="text"
              placeholder="Jane Smith"
              className={`${inp} ${errors.customerName ? 'border-red-400 focus:ring-red-200' : ''}`}
              value={form.customerName}
              onChange={(e) => set('customerName', e.target.value)}
            />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
          </div>
          <div>
            <label className={lbl}>Email Address *</label>
            <input
              type="email"
              placeholder="jane@example.com"
              className={`${inp} ${errors.email ? 'border-red-400 focus:ring-red-200' : ''}`}
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>
      </section>

      {/* ── Step 2: Project details ── */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-3">
          <StepBadge n="2" /> Project Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className={lbl}>Service Type *</label>
            <select
              className={`${inp} ${errors.serviceType ? 'border-red-400' : ''}`}
              value={form.serviceType}
              onChange={(e) => { set('serviceType', e.target.value); set('customization', {}); }}
            >
              <option value="">Choose a service…</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.icon}  {s.title}
                </option>
              ))}
            </select>
            {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
          </div>
          <div>
            <label className={lbl}>Project Title *</label>
            <input
              type="text"
              placeholder="e.g., E-commerce Site for My Boutique"
              className={`${inp} ${errors.projectTitle ? 'border-red-400' : ''}`}
              value={form.projectTitle}
              onChange={(e) => set('projectTitle', e.target.value)}
            />
            {errors.projectTitle && <p className="text-red-500 text-xs mt-1">{errors.projectTitle}</p>}
          </div>
          <div>
            <label className={lbl}>Project Description *</label>
            <textarea
              rows={5}
              placeholder="Describe your project in detail — goals, scope, and any specific requirements…"
              className={`${inp} resize-none ${errors.description ? 'border-red-400' : ''}`}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
            <div className="flex justify-between mt-1">
              {errors.description
                ? <p className="text-red-500 text-xs">{errors.description}</p>
                : <span />}
              <span className="text-xs text-slate-400">{form.description.length} chars</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 3: Customization (only if service selected) ── */}
      {form.serviceType && (
        <section>
          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-3">
            <StepBadge n="3" /> Customize Your Order
          </h3>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
            <CustomizationPanel
              serviceType={form.serviceType}
              customization={form.customization}
              onChange={(c) => set('customization', c)}
            />
          </div>
        </section>
      )}

      {/* ── Reference files ── */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-3">
          <StepBadge n={form.serviceType ? '4' : '3'} />
          Reference Files
          <span className="text-slate-400 font-normal text-sm">(optional)</span>
        </h3>
        <FileUpload files={form.files} onChange={(f) => set('files', f)} />
      </section>

      {/* ── Budget & deadline ── */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-3">
          <StepBadge n={form.serviceType ? '5' : '4'} /> Budget & Timeline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Your Budget (USD) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
              <input
                type="text"
                placeholder="500"
                className={`${inp} pl-7 ${errors.budget ? 'border-red-400' : ''}`}
                value={form.budget}
                onChange={(e) => set('budget', e.target.value)}
              />
            </div>
            {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
          </div>
          <div>
            <label className={lbl}>Deadline *</label>
            <input
              type="date"
              className={`${inp} ${errors.deadline ? 'border-red-400' : ''}`}
              min={new Date().toISOString().split('T')[0]}
              value={form.deadline}
              onChange={(e) => set('deadline', e.target.value)}
            />
            {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>}
          </div>
        </div>
      </section>

      {/* API error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3.5 rounded-xl text-sm flex items-center gap-2">
          ⚠️ {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-base rounded-2xl hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-lg hover:shadow-indigo-200 shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting…
            </>
          ) : (
            'Submit Order →'
          )}
        </button>
        <p className="text-slate-400 text-xs">🔒 Your information is secure and private.</p>
      </div>
    </form>
  );
}
