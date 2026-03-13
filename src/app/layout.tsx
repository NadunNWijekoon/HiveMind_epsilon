
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'HiveMind | Smart Beekeeping Monitor',
  description: 'Monitor your beehive IoT devices in real-time with HiveMind.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-6xl px-4 py-8">
            {children}
          </div>
        </main>
        <footer className="w-full py-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HiveMind IoT. All rights reserved.</p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
