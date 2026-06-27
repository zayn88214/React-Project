import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const COLORS = {
  success: 'text-emerald-500',
  error: 'text-rose-500',
  info: 'text-indigo-500',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, options = {}) => {
    const id = crypto.randomUUID();
    const toast = { id, message, type: options.type || 'success', action: options.action };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => removeToast(id), options.duration || 3500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2 md:left-auto md:right-6 md:translate-x-0">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-800 px-4 py-3 shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 min-w-[260px]"
              >
                <Icon className={`h-5 w-5 shrink-0 ${COLORS[t.type]}`} />
                <span className="flex-1 text-sm text-slate-700 dark:text-slate-200">{t.message}</span>
                {t.action && (
                  <button
                    onClick={() => {
                      t.action.onClick();
                      removeToast(t.id);
                    }}
                    className="text-sm font-semibold text-indigo-500 hover:text-indigo-600"
                  >
                    {t.action.label}
                  </button>
                )}
                <button onClick={() => removeToast(t.id)} aria-label="Dismiss">
                  <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
