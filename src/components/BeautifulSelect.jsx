import React from 'react';

export default function BeautifulSelect({ label, value, onChange, options = [] }) {
  return (
    <label className="block">
      <span className="text-sm text-white/80 block mb-2">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-3 pl-4 pr-10 rounded-lg bg-white/6 border border-white/8 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/40 appearance-none"
        >
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-black">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="w-5 h-5 absolute right-3 top-3 text-white/70 pointer-events-none"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 7l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  );
}
