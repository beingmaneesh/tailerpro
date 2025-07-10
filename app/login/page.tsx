'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers } from '@/lib/mock-data';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const router = useRouter();

  const handleLogin = async (role: 'supervisor' | 'customer') => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
      router.push(role === 'supervisor' ? '/supervisor' : '/order');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Login to TailorPro
            </h1>
            <p className="text-lg text-gray-600">
              Access your account to manage uniforms and orders
            </p>
          </div>

          <Tabs defaultValue="customer" className="w-full animate-fade-in-scale">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="supervisor">Supervisor</TabsTrigger>
            </TabsList>

            <TabsContent value="customer" className="space-y-4">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Customer Login</CardTitle>
                  <CardDescription className="text-base">
                    Access the order portal to place uniform orders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-password">Password</Label>
                    <Input
                      id="customer-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full btn-primary" 
                    onClick={() => handleLogin('customer')}
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login as Customer'}
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
                    <p className="text-xs text-gray-500">Email: parent@email.com</p>
                    <p className="text-xs text-gray-500">Password: password123</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="supervisor" className="space-y-4">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Supervisor Login</CardTitle>
                  <CardDescription className="text-base">
                    Access the management dashboard to review orders and manage uniforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="supervisor-email">Email</Label>
                    <Input
                      id="supervisor-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervisor-password">Password</Label>
                    <Input
                      id="supervisor-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full btn-primary" 
                    onClick={() => handleLogin('supervisor')}
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login as Supervisor'}
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
                    <p className="text-xs text-gray-500">Email: supervisor@school.edu</p>
                    <p className="text-xs text-gray-500">Password: admin123</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}