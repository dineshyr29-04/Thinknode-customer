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
          <BeautifulSelect
            label="Poster Size"
            value={customization.size || ''}
            onChange={(v) => set('size', v)}
            placeholder="Select size"
            labelClass={label}
            options={[
              { value: 'a4', label: 'A4 (Print)' },
              { value: 'a3', label: 'A3 (Print)' },
              { value: 'instagram', label: 'Instagram (1080×1080)' },
              { value: 'facebook', label: 'Facebook Cover' },
              { value: 'banner', label: 'Web Banner' },
              { value: 'custom', label: 'Custom size' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="Color Theme"
            value={customization.colorTheme || ''}
            onChange={(v) => set('colorTheme', v)}
            placeholder="Select theme"
            labelClass={label}
            options={[
              { value: 'brand', label: 'My brand colors' },
              { value: 'dark', label: 'Dark & Elegant' },
              { value: 'light', label: 'Light & Clean' },
              { value: 'vibrant', label: 'Vibrant & Bold' },
              { value: 'gradient', label: 'Gradient' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="Design Style"
            value={customization.style || ''}
            onChange={(v) => set('style', v)}
            placeholder="Select style"
            labelClass={label}
            options={[
              { value: 'professional', label: 'Professional' },
              { value: 'creative', label: 'Creative' },
              { value: 'minimalist', label: 'Minimalist' },
              { value: 'vintage', label: 'Vintage' },
              { value: 'modern', label: 'Modern Flat' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="Number of Designs"
            value={customization.quantity || ''}
            onChange={(v) => set('quantity', v)}
            placeholder="Select quantity"
            labelClass={label}
            options={['1', '2', '3', '5', '10+'].map((v) => ({
              value: v,
              label: `${v} design${v !== '1' ? 's' : ''}`,
            }))}
          />
        </div>
      </div>
    );
  }

  if (serviceType === 'n8n-automation') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <BeautifulSelect
            label="Workflow Type"
            value={customization.workflowType || ''}
            onChange={(v) => set('workflowType', v)}
            placeholder="Select type"
            labelClass={label}
            options={[
              { value: 'data-sync', label: 'Data Sync' },
              { value: 'notification', label: 'Notification Flow' },
              { value: 'reporting', label: 'Automated Reporting' },
              { value: 'lead-management', label: 'Lead Management' },
              { value: 'custom', label: 'Custom Workflow' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="Trigger Type"
            value={customization.triggerType || ''}
            onChange={(v) => set('triggerType', v)}
            placeholder="Select trigger"
            labelClass={label}
            options={[
              { value: 'webhook', label: 'Webhook' },
              { value: 'schedule', label: 'Scheduled (Cron)' },
              { value: 'manual', label: 'Manual trigger' },
              { value: 'event', label: 'Event-based' },
            ]}
          />
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
          <BeautifulSelect
            label="Complexity Level"
            value={customization.complexity || ''}
            onChange={(v) => set('complexity', v)}
            placeholder="Select"
            labelClass={label}
            options={[
              { value: 'simple', label: 'Simple (1–3 steps)' },
              { value: 'moderate', label: 'Moderate (4–10 steps)' },
              { value: 'complex', label: 'Complex (10+ steps, multiple branches)' },
            ]}
          />
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
          <BeautifulSelect
            label="Video Type"
            value={customization.videoType || ''}
            onChange={(v) => set('videoType', v)}
            placeholder="Select video type"
            labelClass={label}
            options={[
              { value: 'youtube', label: 'YouTube Video' },
              { value: 'social-media', label: 'Social Media' },
              { value: 'advertisement', label: 'Advertisement' },
              { value: 'documentary', label: 'Documentary' },
              { value: 'short-form', label: 'Short-form (Reels / Shorts)' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="Video Length"
            value={customization.videoLength || ''}
            onChange={(v) => set('videoLength', v)}
            placeholder="Select length"
            labelClass={label}
            options={[
              { value: 'under-1min', label: 'Under 1 minute' },
              { value: '1-5min', label: '1–5 minutes' },
              { value: '5-10min', label: '5–10 minutes' },
              { value: '10plus', label: '10+ minutes' },
            ]}
          />
        </div>
        <div>
          <BeautifulSelect
            label="Editing Style"
            value={customization.editingStyle || ''}
            onChange={(v) => set('editingStyle', v)}
            placeholder="Select style"
            labelClass={label}
            options={[
              { value: 'basic-cuts', label: 'Basic Cuts' },
              { value: 'cinematic', label: 'Cinematic Edit' },
              { value: 'fast-paced', label: 'Fast-paced Social Edit' },
              { value: 'corporate', label: 'Corporate Style' },
            ]}
          />
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
