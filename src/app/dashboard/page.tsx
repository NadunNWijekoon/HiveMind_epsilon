
"use client";

import { useState, useEffect } from 'react';
import { MOCK_HIVES, generateHistoricalData, MOCK_ALERTS } from '@/lib/mock-data';
import { HiveCard } from '@/components/hive-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const summaryStats = {
    total: MOCK_HIVES.length,
    online: MOCK_HIVES.filter(h => h.status === 'online').length,
    alerts: MOCK_ALERTS.length
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">My Apiary</h1>
          <p className="text-muted-foreground mt-1">Overview of all your registered beehives.</p>
        </div>
        <Link href="/hives/register">
          <Button className="rounded-full bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" /> Register New Hive
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Hives</p>
            <p className="text-3xl font-bold">{summaryStats.total}</p>
          </div>
          <div className="p-3 bg-secondary rounded-xl">
            <Info className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Online Now</p>
            <p className="text-3xl font-bold text-green-600">{summaryStats.online}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <Info className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Active Alerts</p>
            <p className="text-3xl font-bold text-accent">{summaryStats.alerts}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-accent" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Active Notifications</h2>
        <div className="grid gap-3">
          {MOCK_ALERTS.map(alert => (
            <Alert key={alert.id} variant={alert.severity === 'high' ? 'destructive' : 'default'} className="rounded-xl bg-card border shadow-sm">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="capitalize font-bold">{alert.severity} Priority Alert</AlertTitle>
              <AlertDescription>
                {alert.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">My Hives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_HIVES.map(hive => (
            <HiveCard 
              key={hive.id} 
              hive={hive} 
              latestData={generateHistoricalData(1)[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
