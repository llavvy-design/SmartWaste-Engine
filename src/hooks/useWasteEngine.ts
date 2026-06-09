import { useState, useCallback } from 'react';
import type { ZoneNode, LogEntry, MetricScores } from '../types';

const DEFAULT_ZONES: ZoneNode[] = [
  { id: '#101', zoneName: 'Mathare Sector 4', socioeconomicProfile: 'Low-Income/Informal', currentFillLevel: 55, hoursSinceLastPickup: 12, isOverrideActive: false },
  { id: '#102', zoneName: 'Kibera Line Saba', socioeconomicProfile: 'Low-Income/Informal', currentFillLevel: 60, hoursSinceLastPickup: 18, isOverrideActive: false },
  { id: '#103', zoneName: 'Nairobi CBD West', socioeconomicProfile: 'High-Income/Commercial', currentFillLevel: 30, hoursSinceLastPickup: 2, isOverrideActive: false },
];

const ZONE_CODES: Record<string, string> = {
  '#101': 'MAT',
  '#102': 'KIB',
  '#103': 'CBD',
};

function computeHunterWeight(node: ZoneNode): number {
  return (node.currentFillLevel * 0.6) + ((node.hoursSinceLastPickup / 24) * 0.4);
}

export function useWasteEngine() {
  const [zones, setZones] = useState<ZoneNode[]>(DEFAULT_ZONES);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<MetricScores>({ scout: 94, guardian: 98, hunter: 88 });

  const processUpdate = useCallback((updatedZones: ZoneNode[]) => {
    const newLogs: LogEntry[] = [];
    let guardianOverrideActive = false;

    for (const zone of updatedZones) {
      const code = ZONE_CODES[zone.id] || zone.id;
      // SCOUT
      newLogs.push({
        timestamp: new Date().toLocaleTimeString(),
        agent: 'SCOUT',
        message: `Telemetry captured → ${code}:${zone.currentFillLevel} | Hours:${zone.hoursSinceLastPickup}`,
      });

      // GUARDIAN
      const violatesEquity =
        (zone.socioeconomicProfile === 'Low-Income/Informal' && zone.currentFillLevel > 75) ||
        (zone.socioeconomicProfile === 'Low-Income/Informal' && zone.hoursSinceLastPickup >= 24);

      if (violatesEquity) {
        zone.isOverrideActive = true;
        guardianOverrideActive = true;
        newLogs.push({
          timestamp: new Date().toLocaleTimeString(),
          agent: 'GUARDIAN',
          message: `⚠ EQUITY ALERT → ${zone.zoneName} violates Ubuntu Rule. Override ACTIVE.`,
        });
      } else {
        zone.isOverrideActive = false;
        newLogs.push({
          timestamp: new Date().toLocaleTimeString(),
          agent: 'GUARDIAN',
          message: `✓ Equity check passed → ${zone.zoneName}. No override required.`,
        });
      }

      // HUNTER
      const weight = computeHunterWeight(zone);
      newLogs.push({
        timestamp: new Date().toLocaleTimeString(),
        agent: 'HUNTER',
        message: `Route score → ${zone.zoneName}: W=${weight.toFixed(2)} | Rank processing...`,
      });
    }

    const newGuardianScore = guardianOverrideActive ? 72 : 98;
    setLogs(prev => [...newLogs, ...prev].slice(0, 100));
    setMetrics({
      scout: Math.min(100, 94 + Math.floor(Math.random() * 3)),
      guardian: newGuardianScore,
      hunter: 88 + (guardianOverrideActive ? -4 : Math.floor(Math.random() * 2)),
    });
  }, []);

  const adjustFillLevel = useCallback((zoneId: string, delta: number) => {
    setZones(prev => {
      const updated = prev.map(z =>
        z.id === zoneId
          ? { ...z, currentFillLevel: Math.max(0, Math.min(100, z.currentFillLevel + delta)) }
          : z
      );
      processUpdate(updated);
      return updated;
    });
  }, [processUpdate]);

  const executeDispatch = useCallback(() => {
    setZones(prev => {
      const updated = prev.map(z => ({
        ...z,
        currentFillLevel: 0,
        hoursSinceLastPickup: 0,
        isOverrideActive: false,
      }));
      setMetrics({ scout: 94, guardian: 98, hunter: 88 });
      setLogs(prev => [{
        timestamp: new Date().toLocaleTimeString(),
        agent: 'HUNTER',
        message: '⚡ FLEET DISPATCHED. All routes compressed. Zones reset to baseline.',
      }, ...prev].slice(0, 100));
      return updated;
    });
  }, []);

  const getSortedZones = useCallback(() => {
    return [...zones]
      .sort((a, b) => {
        if (a.isOverrideActive && !b.isOverrideActive) return -1;
        if (!a.isOverrideActive && b.isOverrideActive) return 1;
        return computeHunterWeight(b) - computeHunterWeight(a);
      });
  }, [zones]);

  return { zones, logs, metrics, adjustFillLevel, executeDispatch, getSortedZones };
}
