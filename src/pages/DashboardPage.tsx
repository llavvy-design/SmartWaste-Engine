import { Eye, ShieldAlert, Target, Activity, Server, AlertTriangle } from 'lucide-react';
import type { ZoneNode, LogEntry, MetricScores } from '../types';

interface DashboardPageProps {
  zones: ZoneNode[];
  logs: LogEntry[];
  metrics: MetricScores;
  adjustFillLevel: (zoneId: string, delta: number) => void;
  executeDispatch: () => void;
  getSortedZones: () => ZoneNode[];
}

export default function DashboardPage({ zones, logs, metrics, adjustFillLevel, executeDispatch, getSortedZones }: DashboardPageProps) {
  const sortedZones = getSortedZones();

  const overrideCount = zones.filter(z => z.isOverrideActive).length;
  const avgFill = zones.length ? Math.round(zones.reduce((s, z) => s + z.currentFillLevel, 0) / zones.length) : 0;
  const systemHealth = overrideCount === 0 ? 'NOMINAL' : 'EQUITY ALERT';

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-4">♻️ SmartWaste Africa Dispatcher Engine</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* LEFT COLUMN 60% */}
          <div className="lg:col-span-3 space-y-4">
            {/* Section A: Telemetry Simulator */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <Activity size={16} className="text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-800">Section A: Multi-Zone Urban Telemetry Simulator</h3>
              </div>
              <div className="p-4 space-y-3">
                {zones.map(zone => (
                  <ZoneRow key={zone.id} zone={zone} onAdjust={adjustFillLevel} />
                ))}
              </div>
            </div>

            {/* Section D: Dispatch Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800">Section D: Optimized Dispatch Schedule Table</h3>
                <button
                  onClick={executeDispatch}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  ⚡ Execute Optimized Fleet Dispatch
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500">
                      <th className="px-3 py-2 text-left font-semibold">Rank</th>
                      <th className="px-3 py-2 text-left font-semibold">Node / Zone</th>
                      <th className="px-3 py-2 text-left font-semibold">Profile</th>
                      <th className="px-3 py-2 text-left font-semibold">Fill Level</th>
                      <th className="px-3 py-2 text-left font-semibold">Hours Elapsed</th>
                      <th className="px-3 py-2 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedZones.map((zone, idx) => (
                      <tr
                        key={zone.id}
                        className={`border-b border-slate-100 ${zone.isOverrideActive ? 'bg-red-50 border-l-4 border-l-red-500' : ''}`}
                      >
                        <td className="px-3 py-2.5 font-mono font-bold text-slate-700">#{idx + 1}</td>
                        <td className="px-3 py-2.5">
                          <div className="font-semibold text-slate-800">{zone.id}</div>
                          <div className="text-slate-500">{zone.zoneName}</div>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            zone.socioeconomicProfile === 'Low-Income/Informal'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {zone.socioeconomicProfile}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <FillBadge level={zone.currentFillLevel} />
                        </td>
                        <td className="px-3 py-2.5 font-mono text-slate-700">{zone.hoursSinceLastPickup}h</td>
                        <td className="px-3 py-2.5">
                          {zone.isOverrideActive ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold animate-pulse">
                              🔴 GUARDIAN EQUITY OVERRIDE ACTIVE
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-semibold">STANDARD</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN 40% */}
          <div className="lg:col-span-2 space-y-4">
            {/* System Metrics */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Server size={16} className="text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-800">System Health Metrics</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <MiniMetric label="Avg Fill" value={`${avgFill}%`} color={avgFill > 75 ? 'text-red-600' : avgFill > 50 ? 'text-yellow-600' : 'text-emerald-600'} />
                <MiniMetric label="Overrides" value={`${overrideCount}`} color={overrideCount > 0 ? 'text-red-600' : 'text-emerald-600'} />
                <MiniMetric label="Status" value={systemHealth} color={overrideCount > 0 ? 'text-red-600' : 'text-emerald-600'} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <AgentMetric icon={<Eye size={14} />} label="Scout" value={`${metrics.scout}%`} color="text-blue-600" />
                <AgentMetric icon={<ShieldAlert size={14} />} label="Guardian" value={`${metrics.guardian}%`} color="text-purple-600" />
                <AgentMetric icon={<Target size={14} />} label="Hunter" value={`${metrics.hunter}%`} color="text-orange-600" />
              </div>
            </div>

            {/* Section C: Terminal Log */}
            <div className="bg-slate-900 rounded-lg border border-slate-700 shadow-sm overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <AlertTriangle size={14} className="text-emerald-400" />
                <h3 className="font-bold text-xs text-slate-200">Section C: Multi-Agent Operational Decision Log</h3>
              </div>
              <div className="h-80 overflow-y-auto p-3 font-mono text-[11px] leading-relaxed space-y-1">
                {logs.length === 0 && <div className="text-slate-500 italic">Awaiting telemetry input...</div>}
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                    <AgentTag agent={log.agent} />
                    <span className={log.agent === 'GUARDIAN' && log.message.includes('ALERT') ? 'text-red-400' : 'text-slate-300'}>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoneRow({ zone, onAdjust }: { zone: ZoneNode; onAdjust: (id: string, delta: number) => void }) {
  const fillColor = zone.currentFillLevel > 75 ? 'bg-red-500' : zone.currentFillLevel >= 50 ? 'bg-yellow-500' : 'bg-emerald-500';
  const textColor = zone.currentFillLevel > 75 ? 'text-red-600' : zone.currentFillLevel >= 50 ? 'text-yellow-600' : 'text-emerald-600';

  return (
    <div className={`rounded-lg border p-3 ${zone.isOverrideActive ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="font-bold text-sm text-slate-800">{zone.id}</span>
          <span className="ml-2 text-slate-600 text-xs">{zone.zoneName}</span>
          <span className={`ml-2 inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${
            zone.socioeconomicProfile === 'Low-Income/Informal' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
          }`}>{zone.socioeconomicProfile}</span>
          {zone.isOverrideActive && (
            <span className="ml-2 inline-block px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold animate-pulse">OVERRIDE</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => onAdjust(zone.id, -5)} className="w-7 h-7 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors">[-]</button>
          <span className={`font-mono font-bold text-sm min-w-[40px] text-center ${textColor}`}>{zone.currentFillLevel}%</span>
          <button onClick={() => onAdjust(zone.id, 5)} className="w-7 h-7 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors">[+]</button>
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full transition-all duration-300 ${fillColor}`} style={{ width: `${zone.currentFillLevel}%` }} />
      </div>
      <div className="mt-1 text-[10px] text-slate-400">Hours since last pickup: {zone.hoursSinceLastPickup}h</div>
    </div>
  );
}

function FillBadge({ level }: { level: number }) {
  const cls = level > 75 ? 'bg-red-100 text-red-700' : level >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-emerald-100 text-emerald-700';
  return <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-[10px] ${cls}`}>{level}%</span>;
}

function MiniMetric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-lg font-bold font-mono ${color}`}>{value}</div>
      <div className="text-[10px] text-slate-500 font-semibold">{label}</div>
    </div>
  );
}

function AgentMetric({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-2 py-2">
      <div className={color}>{icon}</div>
      <div>
        <div className={`font-mono font-bold text-sm ${color}`}>{value}</div>
        <div className="text-[10px] text-slate-500">{label}</div>
      </div>
    </div>
  );
}

function AgentTag({ agent }: { agent: 'SCOUT' | 'GUARDIAN' | 'HUNTER' }) {
  const cls = agent === 'SCOUT' ? 'bg-blue-900/40 text-blue-300' : agent === 'GUARDIAN' ? 'bg-purple-900/40 text-purple-300' : 'bg-orange-900/40 text-orange-300';
  return <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${cls}`}>{agent}</span>;
}
