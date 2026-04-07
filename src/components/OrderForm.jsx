import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizationPanel from './CustomizationPanel';
import FileUpload from './FileUpload';
import BeautifulSelect from './BeautifulSelect';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
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
  const { user } = useAuth();
  const { updateOrder, resetOrder, setLoading, loading, setError, error } = useOrder();

  const [form, setForm] = useState({
    customerName: user?.name || '',
    email: user?.email || '',
    serviceType: defaultService,
    projectTitle: '',
    description: '',
    budget: '',
    deadline: '',
    customization: {},
    files: [],
  });

  // Keep form in sync with user profile (essential for hidden fields)
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        customerName: prev.customerName || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Only clear error if form has been submitted
    if (submitted && errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.customerName?.trim()) e.customerName = 'Full name is required in your profile.';
    if (!form.email?.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = 'A valid email address is required.';
    if (!form.serviceType) e.serviceType = 'Please select a service.';
    if (!form.projectTitle.trim()) e.projectTitle = 'Project title is required.';
    if (!form.description.trim() || form.description.length < 20)
      e.description = 'Please describe your project (at least 20 characters).';
    if (!form.budget) e.budget = 'Please enter your budget.';
    if (!form.deadline) e.deadline = 'Please select a deadline.';
    
    setErrors(e);
    const isValid = Object.keys(e).length === 0;
    
    if (!isValid) {
      console.warn('Form validation failed:', e);
      // If the failure is in a hidden field, set a global error
      if (e.customerName || e.email) {
        setError('Your user profile seems to be missing required information (Name or Email). Please check your settings.');
      }
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
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
        customer_name: form.customerName,
        email: form.email,
        service_type: form.serviceType,
        project_title: form.projectTitle,
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
      setTimeout(() => navigate('/orders', { state: { success: true } }), 2500);
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
    <form onSubmit={handleSubmit} className="space-y-12" noValidate>
      {/* ── User Context (Professional Touch) ── */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-2">
        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Ordering as</p>
          <p className="text-slate-800 font-bold">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <div className="ml-auto text-emerald-500 flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Verified Account
        </div>
      </div>

      {/* ── Step 1: Project details ── */}
      <section className="relative">
        <div className="absolute -left-10 top-0 bottom-0 w-px bg-slate-100 hidden lg:block" />
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-4">
          <StepBadge n="1" /> 
          <span>Project Essentials</span>
        </h3>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <BeautifulSelect
                label="Service Type *"
                value={form.serviceType}
                onChange={(v) => { set('serviceType', v); set('customization', {}); }}
                placeholder="Select the service you need…"
                className={errors.serviceType ? '!border-red-400 !ring-red-300' : 'border-slate-200'}
                labelClass={lbl}
                options={SERVICES.map((s) => ({
                  value: s.id,
                  label: `${s.icon} ${s.title}`,
                }))}
              />
              {errors.serviceType && <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">× {errors.serviceType}</p>}
            </div>
            <div className="md:col-span-2">
              <label className={lbl}>Project Title *</label>
              <input
                type="text"
                placeholder="e.g., E-commerce Platform for TechSavy"
                className={`${inp} ${errors.projectTitle ? 'border-red-400 bg-red-50/30' : 'hover:border-slate-300'}`}
                value={form.projectTitle}
                onChange={(e) => set('projectTitle', e.target.value)}
              />
              {errors.projectTitle && <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">× {errors.projectTitle}</p>}
            </div>
          </div>
          <div>
            <label className={lbl}>Description & Objectives *</label>
            <textarea
              rows={6}
              placeholder="Provide a detailed overview of your project requirements, goals, and any specific tech stack preferences…"
              className={`${inp} resize-none ${errors.description ? 'border-red-400 bg-red-50/30' : 'hover:border-slate-300'}`}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
            <div className="flex justify-between mt-2">
              {errors.description
                ? <p className="text-red-500 text-xs font-medium ml-1">× {errors.description}</p>
                : <span />}
              <span className={`text-[10px] font-bold uppercase tracking-wider ${form.description.length < 20 ? 'text-slate-400' : 'text-emerald-500'}`}>
                {form.description.length} Characters
              </span>
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
      <section className="relative">
        <div className="absolute -left-10 top-0 bottom-0 w-px bg-slate-100 hidden lg:block" />
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-4">
          <StepBadge n={form.serviceType ? '5' : '4'} /> Budget & Timeline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative group">
            <label className={lbl}>Target Budget (USD) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
              <input
                type="number"
                placeholder="e.g., 2500"
                className={`${inp} pl-8 ${errors.budget ? 'border-red-400 bg-red-50/30' : 'hover:border-slate-300'}`}
                value={form.budget}
                onChange={(e) => set('budget', e.target.value)}
              />
            </div>
            {errors.budget && <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">× {errors.budget}</p>}
          </div>
          <div className="relative">
            <label className={lbl}>Preferred Deadline *</label>
            <input
              type="date"
              className={`${inp} ${errors.deadline ? 'border-red-400 bg-red-50/30' : 'hover:border-slate-300'} appearance-none cursor-pointer`}
              min={new Date().toISOString().split('T')[0]}
              value={form.deadline}
              onChange={(e) => set('deadline', e.target.value)}
            />
            {errors.deadline && <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">× {errors.deadline}</p>}
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
          className="w-full sm:w-auto px-10 py-4 relative group backdrop-blur-md bg-gradient-to-r from-cyan-900 to-indigo-900 text-white font-bold text-base rounded-2xl border border-white/40 hover:border-white/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="relative z-10">Submitting…</span>
            </>
          ) : (
            <span className="relative z-10 bg-blue">Submit Order →</span>
          )}
        </button>
        <p className="text-slate-400 text-xs">🔒 Your information is secure and private.</p>
      </div>
    </form>
  );

}

