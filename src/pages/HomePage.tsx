import { useState, useRef } from 'react';
import { ShieldAlert, Eye, Target, ChevronRight, ArrowRight, Truck, BarChart3, Shield, Route, FileDown, AlertTriangle, Cpu, Droplets, Zap, CheckCircle2, TrendingDown, Clock, Wifi } from 'lucide-react';
import AgentModal from '../components/AgentModal';
import type { PageState } from '../types';

interface HomePageProps {
  setPage: (page: PageState) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/30" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 tracking-wide">
            MULTI-AGENT ORCHESTRATION PLATFORM
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            EcoTransit AI:<br />
            <span className="text-emerald-400">Multi-Agent Urban Waste Orchestration</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-3">
            Turning city constraints into predictive, equitable sanitation infrastructure.
          </p>
          <p className="text-sm text-slate-400 max-w-2xl mb-8 leading-relaxed">
            In Kenyan informal settlements like Mathare and Kibera, waste collection is governed by economic bias —
            low-income zones wait 3-5x longer than commercial districts. EcoTransit AI deploys lightweight edge telemetry
            and a triple-agent ethics engine to guarantee equitable, data-driven fleet dispatch regardless of neighborhood income.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { setPage('dashboard'); window.scrollTo(0, 0); }} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
              Get Started <ChevronRight size={16} />
            </button>
            <button onClick={() => { setPage('dashboard'); window.scrollTo(0, 0); }} className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
              View Live Demo <ArrowRight size={16} />
            </button>
            <button onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2.5 border border-slate-600 hover:border-slate-500 text-slate-300 font-semibold rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">About the Platform</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <GlassCard icon={<AlertTriangle size={20} />} title="Problem Statement" accent="bg-red-500/10 text-red-600 border-red-500/20">
            Waste collection in informal settlements suffers from chronic inefficiency and structural bias. Low-income zones receive pickups 3-5x less frequently than commercial areas, creating environmental health hazards that compound poverty.
          </GlassCard>
          <GlassCard icon={<Cpu size={20} />} title="Solution Overview" accent="bg-blue-500/10 text-blue-600 border-blue-500/20">
            Lightweight edge telemetry nodes and a multi-agent orchestration loop bypass expensive 4G infrastructure. The system processes fill-level and wait-time data locally, applying equity-aware routing in real time.
          </GlassCard>
          <GlassCard icon={<TrendingDown size={20} />} title="Expected Impact" accent="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            30% fuel reduction for fleet operators through optimized routing. Guaranteed 24-hour collection safety windows for all zones, eliminating the multi-day waits that plague informal settlements.
          </GlassCard>
          <GlassCard icon={<Shield size={20} />} title="Key Benefits" accent="bg-purple-500/10 text-purple-600 border-purple-500/20">
            Data minimization schemas protect community privacy. Built-in equity enforcement ensures resource fairness. Offline-first client architecture guarantees resilience when connectivity drops.
          </GlassCard>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-10 text-center">How It Works</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
            <PipelineStep label="Raw Field Telemetry" icon={<Droplets size={18} />} />
            <PipelineArrow />
            <PipelineStep label="Guardian Ethics Audit" icon={<ShieldAlert size={18} />} />
            <PipelineArrow />
            <PipelineStep label="Scout Drift Investigation" icon={<Eye size={18} />} />
            <PipelineArrow />
            <PipelineStep label="Hunter Route Optimization" icon={<Target size={18} />} />
            <PipelineArrow />
            <PipelineStep label="Fleet Dispatch Results" icon={<Truck size={18} />} />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Platform Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard icon={<BarChart3 size={20} />} title="Real-Time Regional Insights" desc="Live fill-level telemetry from urban collection nodes with sub-hour refresh cycles." />
          <FeatureCard icon={<Zap size={20} />} title="AI-Powered Priority Weights" desc="Multi-factor scoring engine weighing capacity, wait time, and socioeconomic equity." />
          <FeatureCard icon={<Shield size={20} />} title="Compliance Gatekeeping" desc="Guardian agent enforces Ubuntu Rule: no low-income zone exceeds 75% or 24h wait." />
          <FeatureCard icon={<Route size={20} />} title="Smart Routing" desc="Hunter agent generates optimized fleet dispatch sequences with fuel-saving route compression." />
          <FeatureCard icon={<FileDown size={20} />} title="Downloadable Executive Audits" desc="Generate formal compliance and performance reports for regulatory submission." />
          <FeatureCard icon={<Wifi size={20} />} title="Offline-First Resilience" desc="Full operational capability without internet. Edge telemetry cached locally." />
        </div>
      </section>

      {/* INTERACTIVE AGENT OVERVIEW */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Interactive Agent Overview</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <AgentOverviewCard
              icon={<ShieldAlert size={24} />}
              title="GUARDIAN AGENT"
              purposes={['Risk Monitoring', 'Compliance Auditing', 'Ethical Bias Mitigation']}
              accent="border-purple-500/40 hover:border-purple-400"
              btnClass="bg-purple-600 hover:bg-purple-700"
              btnLabel="Open Guardian Analytics"
              onClick={() => setOpenModal('guardian')}
            />
            <AgentOverviewCard
              icon={<Eye size={24} />}
              title="SCOUT AGENT"
              purposes={['Telemetry Ingestion', 'Dynamic Trend Analysis', 'Anomalous Activity Detection']}
              accent="border-blue-500/40 hover:border-blue-400"
              btnClass="bg-blue-600 hover:bg-blue-700"
              btnLabel="Open Scout Monitor"
              onClick={() => setOpenModal('scout')}
            />
            <AgentOverviewCard
              icon={<Target size={24} />}
              title="HUNTER AGENT"
              purposes={['Decision Support', 'Fleet Optimization', 'Predictive Route Allocation']}
              accent="border-orange-500/40 hover:border-orange-400"
              btnClass="bg-orange-600 hover:bg-orange-700"
              btnLabel="Open Hunter Routing"
              onClick={() => setOpenModal('hunter')}
            />
          </div>
        </div>
      </section>

      {/* MODALS */}
      <AgentModal isOpen={openModal === 'guardian'} onClose={() => setOpenModal(null)} title="Guardian Analytics" icon={<ShieldAlert size={20} />} accentColor="bg-purple-600/20">
        <MetricRow label="Risk Level" value="Nominal / Low" />
        <MetricRow label="Compliance Score" value="98.4%" />
        <MetricRow label="Active Threat Alerts" value="0" />
        <MetricRow label="Ethical Equity Assessment" value="Fully Compliant" />
        <div className="mt-4 p-3 bg-purple-900/30 rounded border border-purple-500/20">
          <p className="text-xs text-purple-200"><strong>Safety Recommendation:</strong> Prioritize collection nodes that break wait thresholds. Low-income zones exceeding 24h since last pickup must receive immediate fleet dispatch.</p>
        </div>
      </AgentModal>

      <AgentModal isOpen={openModal === 'scout'} onClose={() => setOpenModal(null)} title="Scout Monitor" icon={<Eye size={20} />} accentColor="bg-blue-600/20">
        <MetricRow label="Discovered Volume Movements" value="7 Active" />
        <MetricRow label="Analyzed Data Sources" value="3 Core Zones" />
        <MetricRow label="Local Synced Payloads" value="100% Intact" />
        <MetricRow label="Network Handshake" value="Offline Cache Mode Enabled" />
      </AgentModal>

      <AgentModal isOpen={openModal === 'hunter'} onClose={() => setOpenModal(null)} title="Hunter Routing" icon={<Target size={20} />} accentColor="bg-orange-600/20">
        <MetricRow label="Optimized Route Plans Generated" value="4" />
        <MetricRow label="Dynamic Diversion Recommendations" value="1 Active" />
        <MetricRow label="Current Route Confidence Score" value="92.6%" />
        <MetricRow label="Est. Fuel Saved" value="310 Liters" />
      </AgentModal>
    </div>
  );
}

function GlassCard({ icon, title, accent, children }: { icon: React.ReactNode; title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border p-5 bg-white shadow-sm transition-shadow hover:shadow-md ${accent}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-bold text-sm">{title}</h3>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">{children}</p>
    </div>
  );
}

function PipelineStep({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-3 py-3 bg-white rounded-lg border border-slate-200 shadow-sm min-w-[120px]">
      <div className="text-emerald-600">{icon}</div>
      <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{label}</span>
    </div>
  );
}

function PipelineArrow() {
  return <ChevronRight size={20} className="text-slate-400 hidden md:block shrink-0" />;
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 text-emerald-600">{icon}<h3 className="font-bold text-sm text-slate-800">{title}</h3></div>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function AgentOverviewCard({ icon, title, purposes, accent, btnClass, btnLabel, onClick }: {
  icon: React.ReactNode; title: string; purposes: string[]; accent: string; btnClass: string; btnLabel: string; onClick: () => void;
}) {
  return (
    <div className={`rounded-xl border p-5 bg-slate-800/50 backdrop-blur transition-all hover:bg-slate-800/80 hover:scale-[1.02] ${accent}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-emerald-400">{icon}</div>
        <h3 className="font-bold text-sm tracking-wide">{title}</h3>
      </div>
      <ul className="space-y-1 mb-4">
        {purposes.map(p => <li key={p} className="flex items-center gap-1.5 text-xs text-slate-300"><CheckCircle2 size={12} className="text-emerald-400 shrink-0" />{p}</li>)}
      </ul>
      <button onClick={onClick} className={`w-full py-2 rounded-lg text-xs font-semibold text-white transition-colors ${btnClass}`}>
        {btnLabel}
      </button>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
      <span className="text-slate-400">{label}</span>
      <span className="font-mono font-semibold text-white">{value}</span>
    </div>
  );
}
