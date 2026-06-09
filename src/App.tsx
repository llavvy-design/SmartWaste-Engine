import { useState } from 'react';
import TopNav from './components/TopNav';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import { useWasteEngine } from './hooks/useWasteEngine';
import type { PageState } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const engine = useWasteEngine();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <TopNav currentPage={currentPage} setPage={setCurrentPage} metrics={engine.metrics} />

      {currentPage === 'home' && <HomePage setPage={setCurrentPage} />}
      {currentPage === 'dashboard' && (
        <DashboardPage
          zones={engine.zones}
          logs={engine.logs}
          metrics={engine.metrics}
          adjustFillLevel={engine.adjustFillLevel}
          executeDispatch={engine.executeDispatch}
          getSortedZones={engine.getSortedZones}
        />
      )}
      {currentPage === 'reports' && <ReportsPage zones={engine.zones} metrics={engine.metrics} />}
    </div>
  );
}

export default App;
