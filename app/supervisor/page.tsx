'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shirt, Users, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { mockUniformModels, mockOrders, mockAppointments } from '@/lib/mock-data';

export default function SupervisorDashboard() {
  const { state, dispatch } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!state.user || state.user.role !== 'supervisor') {
      router.push('/login');
      return;
    }

    // Initialize mock data
    dispatch({ type: 'SET_UNIFORM_MODELS', payload: mockUniformModels });
    dispatch({ type: 'SET_ORDERS', payload: mockOrders });
    dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
  }, [state.user, router, dispatch]);

  if (!state.user || state.user.role !== 'supervisor') {
    return null;
  }

  const publishedModels = state.uniformModels.filter(model => model.isPublished);
  const pendingOrders = state.orders.filter(order => order.status === 'pending');
  const todayAppointments = state.appointments.filter(appointment => 
    appointment.date.toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Supervisor Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {state.user.name}. Here's what's happening with your uniforms.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Models</CardTitle>
              <Shirt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedModels.length}</div>
              <p className="text-xs text-muted-foreground">
                Available for orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled for today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{state.orders.length}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shirt className="h-5 w-5 mr-2" />
                Uniform Models
              </CardTitle>
              <CardDescription>
                Manage and publish uniform models for your institution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600">
                  Published: {publishedModels.length} models
                </div>
                <div className="text-sm text-gray-600">
                  Draft: {state.uniformModels.length - publishedModels.length} models
                </div>
              </div>
              <Link href="/supervisor/uniforms">
                <Button className="w-full">
                  Manage Models
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Order Management
              </CardTitle>
              <CardDescription>
                Review and approve pending uniform orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600">
                  Pending: {pendingOrders.length} orders
                </div>
                <div className="text-sm text-gray-600">
                  Approved: {state.orders.filter(o => o.status === 'approved').length} orders
                </div>
              </div>
              <Link href="/supervisor/orders">
                <Button className="w-full">
                  Review Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Appointments
              </CardTitle>
              <CardDescription>
                View and manage measurement appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600">
                  Today: {todayAppointments.length} appointments
                </div>
                <div className="text-sm text-gray-600">
                  Total: {state.appointments.length} appointments
                </div>
              </div>
              <Link href="/supervisor/appointments">
                <Button className="w-full">
                  View Schedule
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest uniform orders requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.orders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-600">{order.uniformModel.name}</div>
                    </div>
                    <Badge variant={order.status === 'pending' ? 'secondary' : 'default'}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
                {state.orders.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No orders yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                Scheduled measurement appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.appointments.slice(0, 3).map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{appointment.customerName}</div>
                      <div className="text-sm text-gray-600">
                        {appointment.date.toLocaleDateString()} at {appointment.timeSlot}
                      </div>
                    </div>
                    <Badge variant={appointment.status === 'scheduled' ? 'secondary' : 'default'}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
                {state.appointments.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No appointments scheduled
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}