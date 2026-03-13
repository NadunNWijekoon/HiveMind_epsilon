
import { Hive, SensorData, Alert } from './types';

export const MOCK_HIVES: Hive[] = [
  { id: 'hive_01', name: 'Meadow Hive A', location: 'South Field', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'hive_02', name: 'Orchard Hive B', location: 'North Orchard', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'hive_03', name: 'Wildflower Hive C', location: 'East Hill', status: 'offline', lastSeen: new Date(Date.now() - 3600000).toISOString() },
];

export const generateHistoricalData = (days: number): SensorData[] => {
  const data: SensorData[] = [];
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    const time = new Date(now - i * 3600000 * 24).toISOString();
    data.push({
      id: `sd_${i}`,
      device_id: 'hive_01',
      temperature: 30 + Math.random() * 10,
      humidity: 60 + Math.random() * 20,
      weight: 40 + Math.random() * 5,
      bee_activity: 80 + Math.random() * 100,
      timestamp: time,
    });
  }
  return data;
};

export const MOCK_ALERTS: Alert[] = [
  { id: 'a1', hive_id: 'hive_01', message: 'High humidity detected in Meadow Hive A', severity: 'medium', created_at: new Date().toISOString(), is_read: false },
  { id: 'a2', hive_id: 'hive_02', message: 'Unusual bee activity in Orchard Hive B', severity: 'high', created_at: new Date(Date.now() - 10000).toISOString(), is_read: false },
];
