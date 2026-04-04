import React from 'react';

export default function BeautifulSelect({
  label,
  value,
  onChange,
  options = [],
  className = '',
  labelClass = 'block text-sm font-medium text-slate-700 mb-1.5',
  placeholder = 'Select...',
}) {
  return (
    <label className="block">
      {label && <span className={`${labelClass}`}>{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} appearance-none`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-slate-800">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="w-5 h-5 absolute right-3 top-3 text-slate-400 pointer-events-none"
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
