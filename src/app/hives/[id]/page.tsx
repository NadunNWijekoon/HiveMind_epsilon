
"use client";

import { use, useState, useEffect } from 'react';
import { MOCK_HIVES, generateHistoricalData } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Thermometer, Droplets, Scale, Activity, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';

export default function HiveDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const hive = MOCK_HIVES.find(h => h.id === resolvedParams.id);
  const [data, setData] = useState(generateHistoricalData(7));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!hive) return <div>Hive not found</div>;
  if (!mounted) return null;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-headline font-bold">{hive.name}</h1>
            <p className="text-muted-foreground">{hive.location} • Device ID: {hive.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full">Export Data</Button>
          <Button className="rounded-full bg-accent hover:bg-accent/90">Hive Settings</Button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Temperature', value: `${data[0].temperature.toFixed(1)}°C`, icon: Thermometer, color: 'text-primary' },
          { label: 'Humidity', value: `${data[0].humidity.toFixed(0)}%`, icon: Droplets, color: 'text-blue-500' },
          { label: 'Weight', value: `${data[0].weight.toFixed(1)} kg`, icon: Scale, color: 'text-orange-500' },
          { label: 'Activity', value: data[0].bee_activity.toFixed(0), icon: Activity, color: 'text-purple-500' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-card/50">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <stat.icon className={`h-6 w-6 mb-2 ${stat.color}`} />
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-card/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Historical Performance</CardTitle>
              <CardDescription>Visualizing hive conditions over the last 7 days</CardDescription>
            </div>
            <Tabs defaultValue="daily" className="w-auto">
              <TabsList className="bg-background/50 rounded-full h-8 p-1">
                <TabsTrigger value="daily" className="text-xs rounded-full">Daily</TabsTrigger>
                <TabsTrigger value="weekly" className="text-xs rounded-full">Weekly</TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs rounded-full">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-primary" /> Temperature & Humidity
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(val) => format(new Date(val), 'MMM d')} 
                      axisLine={false}
                      tickLine={false}
                      tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                    />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                      labelFormatter={(val) => format(new Date(val), 'MMM d, yyyy')}
                    />
                    <Area type="monotone" dataKey="temperature" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorTemp)" />
                    <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-orange-500" /> Hive Weight (Honey Production)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(val) => format(new Date(val), 'MMM d')} 
                      axisLine={false}
                      tickLine={false}
                      tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                    />
                    <YAxis 
                      domain={['dataMin - 2', 'dataMax + 2']} 
                      axisLine={false}
                      tickLine={false}
                      tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                    />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    />
                    <Line type="monotone" dataKey="weight" stroke="#f97316" strokeWidth={3} dot={{r: 4, fill: '#f97316'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
