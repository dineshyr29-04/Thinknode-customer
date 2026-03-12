import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendContactMessage } from '../api/apiClient';

const inp =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition-colors bg-white';
const lbl = 'block text-sm font-medium text-slate-700 mb-1.5';

const INFO = [
  { icon: '📧', label: 'Email', value: 'hello@thinknode.dev' },
  { icon: '⚡', label: 'Response Time', value: 'Within 24 hours' },
  { icon: '🌍', label: 'Availability', value: 'Remote — Worldwide' },
];

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await sendContactMessage(form);
      setSubmitted(true);
    } catch {
      setError('Failed to send your message. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 py-20 px-4 text-center">
        <h1 className="text-5xl font-black text-white mb-4">Get in Touch</h1>
        <p className="text-slate-300 text-xl max-w-xl mx-auto">
          Have a question, need a custom quote, or just want to say hi — we'd love to hear from you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: contact info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Contact Info</h2>

            <div className="space-y-4">
              {INFO.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-slate-700 font-semibold text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Start a project card */}
            <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl p-7 text-white">
              <p className="font-bold text-lg mb-2">Ready to build?</p>
              <p className="text-white/80 text-sm mb-5">
                Skip the chat and go straight to ordering your project.
              </p>
              <button
                onClick={() => navigate('/order')}
                className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Start a Project →
              </button>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-14 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-500">
                  Thanks for reaching out — we'll respond within 24 hours.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-7">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lbl}>Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        className={inp}
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="your@email.com"
                        className={inp}
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={lbl}>Subject *</label>
                    <select
                      required
                      className={inp}
                      value={form.subject}
                      onChange={(e) => set('subject', e.target.value)}
                    >
                      <option value="">Choose a topic…</option>
                      <option>General Inquiry</option>
                      <option>Project Quote</option>
                      <option>Order Support</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={lbl}>Message *</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell us about your project or question…"
                      className={`${inp} resize-none`}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3.5 rounded-xl text-sm">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
