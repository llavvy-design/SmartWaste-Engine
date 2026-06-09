import { Eye, ShieldAlert, Target } from 'lucide-react';
import type { PageState, MetricScores } from '../types';

interface TopNavProps {
  currentPage: PageState;
  setPage: (page: PageState) => void;
  metrics: MetricScores;
}

export default function TopNav({ currentPage, setPage, metrics }: TopNavProps) {
  const navLinks: { label: string; page: PageState }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Control Dashboard', page: 'dashboard' },
    { label: 'Download Reports', page: 'reports' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl">♻️</span>
          <span className="text-white font-bold text-base tracking-tight">EcoTransit AI</span>
        </div>

        <div className="flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => setPage(link.page)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Badge icon={<Eye size={14} />} label="Scout" value={metrics.scout} colorClass="bg-blue-600/20 text-blue-300 border-blue-500/30" pulseClass={metrics.scout < 90 ? 'animate-pulse' : ''} />
          <Badge icon={<ShieldAlert size={14} />} label="Guardian" value={metrics.guardian} colorClass="bg-purple-600/20 text-purple-300 border-purple-500/30" pulseClass={metrics.guardian < 95 ? 'animate-pulse' : ''} />
          <Badge icon={<Target size={14} />} label="Hunter" value={metrics.hunter} colorClass="bg-orange-600/20 text-orange-300 border-orange-500/30" pulseClass={metrics.hunter < 85 ? 'animate-pulse' : ''} />
        </div>
      </div>
    </nav>
  );
}

function Badge({ icon, label, value, colorClass, pulseClass }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorClass: string;
  pulseClass: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-semibold ${colorClass} ${pulseClass}`}>
      {icon}
      <span>{label}</span>
      <span className="font-mono">{value}%</span>
    </div>
  );
}
