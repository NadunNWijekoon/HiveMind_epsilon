
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BeeIcon } from '@/components/bee-icon';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex p-3 bg-primary/10 rounded-2xl mb-4">
            <BeeIcon className="h-8 w-8 text-primary" />
          </Link>
          <h1 className="text-3xl font-headline font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to monitor your colonies.</p>
        </div>

        <Card className="rounded-3xl border-border/50 shadow-lg">
          <form onSubmit={handleLogin}>
            <CardContent className="p-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="name@example.com" required className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <Input id="password" type="password" required className="rounded-xl h-11" />
              </div>
            </CardContent>
            <CardFooter className="px-8 pb-8 flex flex-col gap-4">
              <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90">
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account? <Link href="/auth/register" className="text-primary font-semibold hover:underline">Register</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
