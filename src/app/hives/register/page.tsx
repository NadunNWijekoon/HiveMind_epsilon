
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BeeIcon } from '@/components/bee-icon';
import { Wifi, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

export default function RegisterHivePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Hive Registered Successfully",
        description: "Your new IoT device is now connected and monitoring.",
      });
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-primary gap-1 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-2">
          <BeeIcon className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-headline font-bold">New Hive Registration</h1>
        <p className="text-muted-foreground">Pair your ESP32 device with your HiveMind account.</p>
      </div>

      <Card className="rounded-[2rem] border-border/50 shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit}>
          <CardHeader className="bg-secondary/30 p-8">
            <CardTitle>Device Details</CardTitle>
            <CardDescription>Enter the information provided with your IoT kit.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hive-name">Hive Nickname</Label>
              <Input id="hive-name" placeholder="e.g. Sunny Orchard A" required className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="device-id">Device ID (MAC Address)</Label>
              <div className="relative">
                <Wifi className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="device-id" placeholder="XX:XX:XX:XX:XX:XX" required className="pl-12 rounded-xl h-12 font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">General Location</Label>
              <Input id="location" placeholder="e.g. North Pasture" className="rounded-xl h-12" />
            </div>
          </CardContent>
          <CardFooter className="p-8 bg-secondary/10 flex flex-col gap-4">
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-lg">
              {loading ? "Connecting to Device..." : "Register & Start Monitoring"}
            </Button>
            <p className="text-xs text-center text-muted-foreground px-4">
              By registering, you agree to receive critical health alerts for this beehive.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
