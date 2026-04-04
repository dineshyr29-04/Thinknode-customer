import React, { useState } from 'react';

export default function BeautifulSelect({
  label,
  value,
  onChange,
  options = [],
  className = '',
  labelClass = 'block text-sm font-medium text-slate-700 mb-1.5',
  placeholder = 'Select...',
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label className="block">
      {label && <span className={`${labelClass}`}>{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-slate-700 transition-all duration-200 appearance-none cursor-pointer hover:border-indigo-300 ${
            isFocused
              ? 'ring-2 ring-indigo-300 border-indigo-400 shadow-lg shadow-indigo-100'
              : 'outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400'
          } bg-white ${className}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className={`w-5 h-5 absolute right-3 top-3.5 pointer-events-none transition-all duration-200 ${
            isFocused ? 'text-indigo-500' : 'text-slate-400'
          }`}
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
