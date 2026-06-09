import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
}

export default function AgentModal({ isOpen, onClose, title, icon, accentColor, children }: AgentModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        onClick={e => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-xl border shadow-2xl p-6 animate-scale-in
          bg-slate-900/90 border-slate-600/50 backdrop-blur-xl`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accentColor}`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}
