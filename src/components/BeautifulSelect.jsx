import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CrazySelect({
  label,
  value,
  onChange = () => {}, // Default empty function prevents "onChange is not a function"
  options = [],        // Default empty array prevents ".map is not a function"
  placeholder = 'Select an option...',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Safely find the selected option (prevents crashing if value is null/undefined)
  const selectedOption = Array.isArray(options) 
    ? options.find((o) => o?.value === value) 
    : null;

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative w-72 font-sans" ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-bold uppercase tracking-[2px] text-slate-400 mb-2 ml-1">
          {label}
        </label>
      )}

      {/* Main Trigger */}
      <button
        type="button" // Prevents accidental form submissions
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full flex items-center justify-between px-5 py-4 bg-white border-2 transition-all duration-500 rounded-2xl group
          ${isOpen 
            ? 'border-fuchsia-500 shadow-[0_10px_30px_-10px_rgba(217,70,239,0.4)] scale-[1.03]' 
            : 'border-slate-100 hover:border-fuchsia-200 hover:shadow-xl'}
        `}
      >
        <span className={`text-sm font-semibold tracking-wide ${!selectedOption ? 'text-slate-300' : 'text-slate-700'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={isOpen ? 'text-fuchsia-500' : 'text-slate-300'}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 15, rotateX: -15 }}
            animate={{ opacity: 1, y: 8, rotateX: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 w-full bg-white/90 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden p-2 origin-top"
          >
            {/* Guard against non-array options */}
            {Array.isArray(options) && options.length > 0 ? (
              options.map((opt, i) => (
                <motion.li
                  key={opt?.value || i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 100 }}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 mb-1 last:mb-0 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between group/item
                    ${value === opt.value 
                      ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-600 hover:bg-fuchsia-50 hover:text-fuchsia-600'}
                  `}
                >
                  <span className="text-sm font-medium">{opt.label}</span>
                  {value === opt.value && (
                    <motion.span layoutId="active-dot" className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                  )}
                </motion.li>
              ))
            ) : (
              <li className="px-4 py-3 text-xs text-slate-400 italic text-center">No options available</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
