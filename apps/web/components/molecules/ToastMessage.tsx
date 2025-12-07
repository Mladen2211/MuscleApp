import { FaCheck, FaTriangleExclamation } from 'react-icons/fa6';

import type { ToastMessage as ToastMessageType } from '@/types';

interface ToastMessageProps {
  toast: ToastMessageType;
}

export function ToastMessage({ toast }: ToastMessageProps) {
  const isSuccess = toast.tone === 'success';

  return (
    <div
      className={`toast-enter pointer-events-auto px-5 py-3.5 rounded-full shadow-xl flex items-center gap-3 text-sm font-semibold backdrop-blur-md ${
        isSuccess ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900' : 'bg-rose-500 text-white'
      }`}
    >
      {isSuccess ? <FaCheck className="text-xs" /> : <FaTriangleExclamation className="text-xs" />}
      <span>{toast.message}</span>
    </div>
  );
}
