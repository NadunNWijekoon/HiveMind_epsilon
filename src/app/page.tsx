
import Link from 'next/link';
import { BeeIcon } from '@/components/bee-icon';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16 py-12 md:py-24">
      <section className="text-center space-y-6 max-w-3xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <BeeIcon className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary">
          Smart Beekeeping for the Modern Apiary
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Monitor your hives in real-time. Track temperature, humidity, weight, and activity with HiveMind's minimalist dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/auth/register">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      <section className="w-full grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-card p-8 rounded-3xl border shadow-sm space-y-4">
          <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Zap className="text-primary h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Real-time Data</h3>
          <p className="text-muted-foreground">Get instant updates from your IoT devices with MQTT ingestion. Never miss a moment.</p>
        </div>
        <div className="bg-card p-8 rounded-3xl border shadow-sm space-y-4">
          <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="text-accent h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Smart Alerts</h3>
          <p className="text-muted-foreground">Automatic notifications when hive conditions go outside safe ranges for your bees.</p>
        </div>
        <div className="bg-card p-8 rounded-3xl border shadow-sm space-y-4">
          <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <BarChart3 className="text-primary h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Historical Insights</h3>
          <p className="text-muted-foreground">Visualize trends over weeks and months to optimize honey production and hive health.</p>
        </div>
      </section>

      <section className="w-full max-w-5xl rounded-[3rem] overflow-hidden border shadow-2xl relative aspect-video">
        <Image 
          src="https://picsum.photos/seed/hive-dashboard/1200/675" 
          alt="Dashboard Preview" 
          fill 
          className="object-cover"
          data-ai-hint="beekeeping dashboard"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex items-end p-12">
          <div className="bg-background/95 backdrop-blur p-6 rounded-2xl border shadow-xl max-w-sm">
            <h4 className="font-bold text-lg mb-2">Clean Minimalist UI</h4>
            <p className="text-sm text-muted-foreground">Designed for clarity and focus. Monitor dozens of hives with ease.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
