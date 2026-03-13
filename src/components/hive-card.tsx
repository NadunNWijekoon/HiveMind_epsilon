
"use client";

import { Hive, SensorData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Droplets, Scale, Activity, Wifi, WifiOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface HiveCardProps {
  hive: Hive;
  latestData?: SensorData;
}

export function HiveCard({ hive, latestData }: HiveCardProps) {
  const isOnline = hive.status === 'online';

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
            {hive.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{hive.location}</p>
        </div>
        <Badge 
          variant={isOnline ? "default" : "secondary"} 
          className={isOnline ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-500 hover:bg-gray-100"}
        >
          {isOnline ? (
            <Wifi className="w-3 h-3 mr-1" />
          ) : (
            <WifiOff className="w-3 h-3 mr-1" />
          )}
          {hive.status.toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Thermometer className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Temp</p>
              <p className="text-sm font-bold">{latestData?.temperature.toFixed(1) || '--'}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Droplets className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Humidity</p>
              <p className="text-sm font-bold">{latestData?.humidity.toFixed(0) || '--'}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Scale className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Weight</p>
              <p className="text-sm font-bold">{latestData?.weight.toFixed(1) || '--'} kg</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Activity</p>
              <p className="text-sm font-bold">{latestData?.bee_activity.toFixed(0) || '--'}</p>
            </div>
          </div>
        </div>
        <Link href={`/hives/${hive.id}`} className="block">
          <Button variant="ghost" className="w-full justify-between hover:bg-secondary text-primary rounded-xl">
            View Analytics <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
