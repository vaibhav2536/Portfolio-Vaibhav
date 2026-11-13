import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const lines = [
  'mounting /home/vaibhav',
  'loading experience.log · 7 roles',
  'compiling skills.json',
  'warming up the constellation',
  'ready.',
];

/** Short boot sequence, shown once per browser session. Click to skip. */
const BootScreen: React.FC = () => {
  const [visible, setVisible] = useState(() => {
    // Skip for deep links (/#resume) and ?boot=0, and only show once per session.
    if (window.location.hash || new URLSearchParams(window.location.search).get('boot') === '0') return false;
    try {
      return !sessionStorage.getItem('vaibhav-os-booted');
    } catch {
      return false;
    }
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem('vaibhav-os-booted', '1');
    } catch {
      /* ignore */
    }
    const interval = setInterval(() => setStep(s => s + 1), 280);
    const done = setTimeout(() => setVisible(false), 280 * lines.length + 450);
    return () => {
      clearInterval(interval);
      clearTimeout(done);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex cursor-pointer flex-col items-center justify-center bg-ink-950"
          style={{ zIndex: 9999 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 45 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="mb-8 h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 shadow-[0_0_60px_rgba(192,132,252,0.6)]"
          />
          <div className="w-72 font-mono text-xs text-white/60">
            {lines.slice(0, step).map((l, i) => (
              <motion.div key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="leading-6">
                <span className={i === lines.length - 1 ? 'text-emerald-400' : 'text-violet-300'}>›</span> {l}
              </motion.div>
            ))}
          </div>
          <div className="mt-6 h-[3px] w-72 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: (280 * lines.length) / 1000, ease: 'easeInOut' }}
            />
          </div>
          <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/25">click to skip</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;
