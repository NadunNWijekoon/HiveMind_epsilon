
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Hive {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  lastSeen: string;
}

export interface SensorData {
  id: string;
  device_id: string;
  temperature: number;
  humidity: number;
  weight: number;
  bee_activity: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  hive_id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  created_at: string;
  is_read: boolean;
}
