export interface ZoneNode {
  id: string;
  zoneName: string;
  socioeconomicProfile: 'Low-Income/Informal' | 'High-Income/Commercial';
  currentFillLevel: number;
  hoursSinceLastPickup: number;
  isOverrideActive: boolean;
}

export interface LogEntry {
  timestamp: string;
  agent: 'SCOUT' | 'GUARDIAN' | 'HUNTER';
  message: string;
}

export interface MetricScores {
  scout: number;
  guardian: number;
  hunter: number;
}

export type PageState = 'home' | 'dashboard' | 'reports';
