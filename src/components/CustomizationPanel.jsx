import BeautifulSelect from './BeautifulSelect';

const field =
  'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition-colors bg-white';
const label = 'block text-sm font-medium text-slate-700 mb-1.5';

export default function CustomizationPanel({ serviceType, customization, onChange }) {
  const set = (key, value) => onChange({ ...customization, [key]: value });

  if (serviceType === 'web-development') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <BeautifulSelect
            label="Number of Pages"
            value={customization.pages || ''}
            onChange={(v) => set('pages', v)}
            placeholder="Select pages"
            labelClass={label}
            options={['1–3', '4–7', '8–15', '15+'].map((v) => ({ value: v, label: `${v} pages` }))}
          />
        </div>
        <div>
          <BeautifulSelect
            label="CMS Required?"
            value={customization.cms || ''}
            onChange={(v) => set('cms', v)}
            placeholder="Select"
            labelClass={label}
            options={[
              { value: 'none', label: 'No CMS needed' },
              { value: 'wordpress', label: 'WordPress' },
              { value: 'sanity', label: 'Sanity.io' },
              { value: 'contentful', label: 'Contentful' },
              { value: 'custom', label: 'Custom CMS' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="E-Commerce Support"
            value={customization.ecommerce || ''}
            onChange={(v) => set('ecommerce', v)}
            placeholder="Select"
            labelClass={label}
            options={[
              { value: 'none', label: 'Not needed' },
              { value: 'basic', label: 'Basic shop' },
              { value: 'full', label: 'Full e-commerce' },
              { value: 'woocommerce', label: 'WooCommerce' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="Design Style"
            value={customization.designStyle || ''}
            onChange={(v) => set('designStyle', v)}
            placeholder="Select"
            labelClass={label}
            options={[
              { value: 'minimal', label: 'Minimal' },
              { value: 'corporate', label: 'Corporate' },
              { value: 'creative', label: 'Creative' },
              { value: 'bold', label: 'Bold & Modern' },
            ]}
          />
        </div>
      </div>
    );
  }

  if (serviceType === 'frontend-app') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <BeautifulSelect
            label="Framework Preference"
            value={customization.framework || ''}
            onChange={(v) => set('framework', v)}
            placeholder="Select framework"
            labelClass={label}
            options={[
              { value: 'react', label: 'React.js' },
              { value: 'vue', label: 'Vue.js' },
              { value: 'next', label: 'Next.js' },
              { value: 'remix', label: 'Remix' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="UI Complexity"
            value={customization.uiComplexity || ''}
            onChange={(v) => set('uiComplexity', v)}
            placeholder="Select complexity"
            labelClass={label}
            options={[
              { value: 'simple', label: 'Simple — basic pages' },
              { value: 'moderate', label: 'Moderate — dashboard' },
              { value: 'complex', label: 'Complex — data-heavy' },
            ]}
          />
        </div>
        <div>
          <label className={label}>API Integrations</label>
          <input
            type="text"
            placeholder="e.g., Stripe, Firebase, REST API"
            className={field}
            value={customization.apiIntegrations || ''}
            onChange={(e) => set('apiIntegrations', e.target.value)}
          />
        </div>
        <div>
          <BeautifulSelect
            label="Authentication Required"
            value={customization.auth || ''}
            onChange={(v) => set('auth', v)}
            placeholder="Select"
            labelClass={label}
            options={[
              { value: 'none', label: 'No auth needed' },
              { value: 'basic', label: 'Basic login / signup' },
              { value: 'roles', label: 'Role-based access' },
              { value: 'oauth', label: 'OAuth (Google, GitHub)' },
            ]}
          />
        </div>
      </div>
    );
  }

  if (serviceType === 'e-poster-design') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Poster Size</label>
          <select
            className={field}
            value={customization.size || ''}
            onChange={(e) => set('size', e.target.value)}
          >
            <option value="">Select size</option>
            <option value="a4">A4 (Print)</option>
            <option value="a3">A3 (Print)</option>
            <option value="instagram">Instagram (1080×1080)</option>
            <option value="facebook">Facebook Cover</option>
            <option value="banner">Web Banner</option>
            <option value="custom">Custom size</option>
          </select>
        </div>
        <div>
          <label className={label}>Color Theme</label>
          <select
            className={field}
            value={customization.colorTheme || ''}
            onChange={(e) => set('colorTheme', e.target.value)}
          >
            <option value="">Select theme</option>
            <option value="brand">My brand colors</option>
            <option value="dark">Dark & Elegant</option>
            <option value="light">Light & Clean</option>
            <option value="vibrant">Vibrant & Bold</option>
            <option value="gradient">Gradient</option>
          </select>
        </div>
        <div>
          <label className={label}>Design Style</label>
          <select
            className={field}
            value={customization.style || ''}
            onChange={(e) => set('style', e.target.value)}
          >
            <option value="">Select style</option>
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
            <option value="minimalist">Minimalist</option>
            <option value="vintage">Vintage</option>
            <option value="modern">Modern Flat</option>
          </select>
        </div>
        <div>
          <label className={label}>Number of Designs</label>
          <select
            className={field}
            value={customization.quantity || ''}
            onChange={(e) => set('quantity', e.target.value)}
          >
            <option value="">Select quantity</option>
            {['1', '2', '3', '5', '10+'].map((v) => (
              <option key={v} value={v}>
                {v} design{v !== '1' ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (serviceType === 'n8n-automation') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Workflow Type</label>
          <select
            className={field}
            value={customization.workflowType || ''}
            onChange={(e) => set('workflowType', e.target.value)}
          >
            <option value="">Select type</option>
            <option value="data-sync">Data Sync</option>
            <option value="notification">Notification Flow</option>
            <option value="reporting">Automated Reporting</option>
            <option value="lead-management">Lead Management</option>
            <option value="custom">Custom Workflow</option>
          </select>
        </div>
        <div>
          <label className={label}>Trigger Type</label>
          <select
            className={field}
            value={customization.triggerType || ''}
            onChange={(e) => set('triggerType', e.target.value)}
          >
            <option value="">Select trigger</option>
            <option value="webhook">Webhook</option>
            <option value="schedule">Scheduled (Cron)</option>
            <option value="manual">Manual trigger</option>
            <option value="event">Event-based</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Tools / Integrations Required</label>
          <input
            type="text"
            placeholder="e.g., Slack, Gmail, Airtable, Stripe, Notion..."
            className={field}
            value={customization.integrations || ''}
            onChange={(e) => set('integrations', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Complexity Level</label>
          <select
            className={field}
            value={customization.complexity || ''}
            onChange={(e) => set('complexity', e.target.value)}
          >
            <option value="">Select</option>
            <option value="simple">Simple (1–3 steps)</option>
            <option value="moderate">Moderate (4–10 steps)</option>
            <option value="complex">Complex (10+ steps, multiple branches)</option>
          </select>
        </div>
      </div>
    );
  }

  if (serviceType === 'video-editing') {
    const extras = customization.additionalFeatures || [];
    const toggleExtra = (val) =>
      set(
        'additionalFeatures',
        extras.includes(val) ? extras.filter((e) => e !== val) : [...extras, val],
      );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Video Type</label>
          <select
            className={field}
            value={customization.videoType || ''}
            onChange={(e) => set('videoType', e.target.value)}
          >
            <option value="">Select video type</option>
            <option value="youtube">YouTube Video</option>
            <option value="social-media">Social Media</option>
            <option value="advertisement">Advertisement</option>
            <option value="documentary">Documentary</option>
            <option value="short-form">Short-form (Reels / Shorts)</option>
          </select>
        </div>
        <div>
          <label className={label}>Video Length</label>
          <select
            className={field}
            value={customization.videoLength || ''}
            onChange={(e) => set('videoLength', e.target.value)}
          >
            <option value="">Select length</option>
            <option value="under-1min">Under 1 minute</option>
            <option value="1-5min">1–5 minutes</option>
            <option value="5-10min">5–10 minutes</option>
            <option value="10plus">10+ minutes</option>
          </select>
        </div>
        <div>
          <label className={label}>Editing Style</label>
          <select
            className={field}
            value={customization.editingStyle || ''}
            onChange={(e) => set('editingStyle', e.target.value)}
          >
            <option value="">Select style</option>
            <option value="basic-cuts">Basic Cuts</option>
            <option value="cinematic">Cinematic Edit</option>
            <option value="fast-paced">Fast-paced Social Edit</option>
            <option value="corporate">Corporate Style</option>
          </select>
        </div>
        <div>
          <label className={label}>Additional Features</label>
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              ['subtitles', 'Subtitles'],
              ['motion-graphics', 'Motion Graphics'],
              ['sound-effects', 'Sound Effects'],
              ['background-music', 'Background Music'],
              ['color-grading', 'Color Grading'],
            ].map(([val, lbl]) => (
              <button
                key={val}
                type="button"
                onClick={() => toggleExtra(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  extras.includes(val)
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'bg-white border-gray-200 text-slate-600 hover:border-rose-300'
                }`}
              >
                {extras.includes(val) ? '✓ ' : ''}{lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Additional Notes for Editor</label>
          <textarea
            rows={3}
            placeholder="Describe your style, mood, reference videos, brand guidelines…"
            className={`${field} resize-none`}
            value={customization.notes || ''}
            onChange={(e) => set('notes', e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <p className="text-slate-400 text-sm text-center py-6">
      Select a service type above to see customization options.
    </p>
  );
}
