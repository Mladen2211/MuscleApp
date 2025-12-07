import type { ToastMessage as ToastMessageType } from '../../types';
import { ToastMessage } from '../molecules/ToastMessage';

interface ToastStackProps {
  toasts: ToastMessageType[];
}

export function ToastStack({ toasts }: ToastStackProps) {
  return (
    <div className="fixed top-6 left-0 right-0 z-[60] pointer-events-none flex flex-col items-center gap-2 p-4">
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
