import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CrazySelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option...',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative w-64 font-sans" ref={containerRef}>
      {label && (
        <label className="block text-xs font-black uppercase tracking-widest text-indigo-400 mb-2 ml-1">
          {label}
        </label>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full flex items-center justify-between px-4 py-3 bg-white border-2 transition-all duration-300 rounded-xl group
          ${isOpen ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-[1.02]' : 'border-slate-200 hover:border-indigo-300'}
        `}
      >
        <span className={`text-sm font-medium ${!selectedOption ? 'text-slate-400' : 'text-slate-800'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        {/* Animated Chevron */}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0, y: isOpen ? -2 : 0 }}
          className={`w-5 h-5 ${isOpen ? 'text-indigo-500' : 'text-slate-400'}`}
          viewBox="0 0 20 20" fill="none" stroke="currentColor"
        >
          <path d="M6 8l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute z-50 w-full bg-white/80 backdrop-blur-xl border-2 border-indigo-100 rounded-2xl shadow-2xl overflow-hidden py-2"
          >
            {options.map((opt, i) => (
              <motion.li
                key={opt.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 mx-2 my-1 text-sm rounded-lg cursor-pointer transition-all flex items-center justify-between
                  ${value === opt.value 
                    ? 'bg-indigo-500 text-white font-bold' 
                    : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}
                `}
              >
                {opt.label}
                {value === opt.value && (
                  <motion.div layoutId="check" className="w-2 h-2 bg-white rounded-full" />
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
