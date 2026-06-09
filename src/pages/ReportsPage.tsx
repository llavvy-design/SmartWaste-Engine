import { useState } from 'react';
import { FileText, ShieldAlert, Eye, Target, BookOpen, Download, Loader2 } from 'lucide-react';
import type { ZoneNode, MetricScores } from '../types';

interface ReportsPageProps {
  zones: ZoneNode[];
  metrics: MetricScores;
}

interface ReportDef {
  id: string;
  title: string;
  icon: React.ReactNode;
  accent: string;
  description: string;
}

const REPORTS: ReportDef[] = [
  { id: 'executive', title: 'Executive Summary Performance Audit', icon: <FileText size={18} />, accent: 'text-emerald-600', description: 'High-level operational overview with key performance indicators and fleet efficiency metrics.' },
  { id: 'guardian', title: 'Guardian Ethical Compliance Log', icon: <ShieldAlert size={18} />, accent: 'text-purple-600', description: 'Detailed equity compliance records, override events, and Ubuntu Rule enforcement audit trail.' },
  { id: 'scout', title: 'Scout Telemetry Drift Analysis', icon: <Eye size={18} />, accent: 'text-blue-600', description: 'Telemetry ingestion logs, anomaly detection events, and data source integrity analysis.' },
  { id: 'hunter', title: 'Hunter Route Efficiency Analytics Report', icon: <Target size={18} />, accent: 'text-orange-600', description: 'Route optimization scores, fuel savings projections, and fleet dispatch sequencing.' },
  { id: 'dossier', title: 'Complete Capstone End-to-End System Dossier', icon: <BookOpen size={18} />, accent: 'text-slate-700', description: 'Comprehensive technical dossier covering all agent operations, system architecture, and field data.' },
];

export default function ReportsPage({ zones, metrics }: ReportsPageProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);

  const handleGenerate = () => {
    if (!selectedReport) return;
    setGenerating(true);
    setPreviewReady(false);
    setTimeout(() => {
      setGenerating(false);
      setPreviewReady(true);
    }, 2000);
  };

  const report = REPORTS.find(r => r.id === selectedReport);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Download Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left: Catalog */}
          <div className="lg:col-span-2 space-y-3">
            {REPORTS.map(r => (
              <button
                key={r.id}
                onClick={() => { setSelectedReport(r.id); setPreviewReady(false); }}
                className={`w-full text-left bg-white rounded-lg border p-4 transition-all hover:shadow-md ${
                  selectedReport === r.id ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={r.accent}>{r.icon}</div>
                  <h4 className="font-bold text-sm text-slate-800">{r.title}</h4>
                </div>
                <p className="text-xs text-slate-500 pl-8">{r.description}</p>
              </button>
            ))}
            <button
              onClick={handleGenerate}
              disabled={!selectedReport || generating}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {generating ? <Loader2 size={16} className="animate-spin" /> : null}
              {generating ? 'Compiling Document...' : '⚡ Generate & Compile PDF Report'}
            </button>
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm min-h-[500px]">
              <div className="px-4 py-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-800">Live Interactive Report Previewer</h3>
              </div>
              <div className="p-6">
                {generating && (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 size={32} className="animate-spin text-emerald-600" />
                    <p className="text-sm text-slate-500">Processing document structure...</p>
                    <div className="w-48 bg-slate-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                  </div>
                )}

                {previewReady && report && (
                  <div className="animate-fade-in">
                    <div className="border-b border-slate-200 pb-4 mb-4">
                      <h4 className="text-base font-bold text-slate-800 mb-1">{report.title}</h4>
                      <div className="text-xs text-slate-500">Generated: {new Date().toLocaleString()} | Classification: Internal | Status: Final</div>
                    </div>

                    <div className="text-xs text-slate-600 leading-relaxed space-y-3 mb-5">
                      <p>This report presents the operational analysis for the EcoTransit AI multi-agent urban waste orchestration platform. The system employs three autonomous agents — Scout, Guardian, and Hunter — to process real-time telemetry, enforce ethical equity constraints, and optimize fleet dispatch routing across urban collection zones.</p>
                      <p>Data was collected from {zones.length} active monitoring zones deployed across Nairobi metropolitan areas including informal settlements and commercial districts. All computations were performed client-side using offline-first edge telemetry protocols.</p>
                    </div>

                    <table className="w-full text-xs mb-5">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-2 py-1.5 text-left font-semibold text-slate-600">Zone</th>
                          <th className="px-2 py-1.5 text-left font-semibold text-slate-600">Profile</th>
                          <th className="px-2 py-1.5 text-left font-semibold text-slate-600">Fill Level</th>
                          <th className="px-2 py-1.5 text-left font-semibold text-slate-600">Hours Elapsed</th>
                          <th className="px-2 py-1.5 text-left font-semibold text-slate-600">Override</th>
                        </tr>
                      </thead>
                      <tbody>
                        {zones.map(z => (
                          <tr key={z.id} className="border-b border-slate-100">
                            <td className="px-2 py-1.5 font-semibold text-slate-700">{z.zoneName}</td>
                            <td className="px-2 py-1.5 text-slate-500">{z.socioeconomicProfile}</td>
                            <td className="px-2 py-1.5 font-mono">{z.currentFillLevel}%</td>
                            <td className="px-2 py-1.5 font-mono">{z.hoursSinceLastPickup}h</td>
                            <td className="px-2 py-1.5">{z.isOverrideActive ? <span className="text-red-600 font-bold">YES</span> : 'No'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 mb-4">
                      <strong>Agent Metrics Summary:</strong> Scout: {metrics.scout}% | Guardian: {metrics.guardian}% | Hunter: {metrics.hunter}%
                    </div>

                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2">
                      <Download size={14} /> 📥 Download Document Format
                    </button>
                  </div>
                )}

                {!generating && !previewReady && (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <FileText size={40} className="mb-3 opacity-30" />
                    <p className="text-sm">Select a report and click Generate to preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
