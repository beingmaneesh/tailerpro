'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check, Upload, User, Mail, Phone } from 'lucide-react';
import { Order } from '@/lib/types';

export default function ReviewPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state.currentOrder) {
      router.push('/order');
    }
  }, [state.currentOrder, router]);

  const handleSubmitOrder = async () => {
    if (!state.currentOrder || !state.currentOrder.uniformModel) return;

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrder: Order = {
      id: Date.now().toString(),
      customerId: Date.now().toString(),
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      uniformModelId: state.currentOrder.uniformModelId!,
      uniformModel: state.currentOrder.uniformModel,
      sizingOption: state.currentOrder.sizingOption!,
      standardSize: state.currentOrder.standardSize,
      measurements: state.currentOrder.measurements,
      appointmentId: state.currentOrder.appointmentId,
      status: 'pending',
      notes: customerInfo.notes,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    dispatch({ type: 'SET_CURRENT_ORDER', payload: null });
    
    setLoading(false);
    router.push('/order/confirmation');
  };

  const handleBack = () => {
    if (state.currentOrder?.sizingOption === 'standard') {
      router.push('/order/standard-sizes');
    } else if (state.currentOrder?.sizingOption === 'digital') {
      router.push('/order/measurement');
    } else {
      router.push('/order/appointment');
    }
  };

  if (!state.currentOrder || !state.currentOrder.uniformModel) {
    return null;
  }

  const { uniformModel, sizingOption, standardSize, measurements, appointmentId } = state.currentOrder;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Review Your Order
            </h1>
            <p className="text-gray-600">
              Please review your order details and provide your contact information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Uniform Model */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={uniformModel.fabricImage}
                        alt={uniformModel.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{uniformModel.name}</h3>
                        <p className="text-sm text-gray-600">{uniformModel.description}</p>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {uniformModel.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Sizing Option */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Sizing Option</h4>
                      <Badge variant="secondary" className="capitalize">
                        {sizingOption === 'standard' ? 'Standard Size' : 
                         sizingOption === 'digital' ? 'Digital Measurements' : 
                         'Appointment Booking'}
                      </Badge>
                    </div>

                    {/* Size Details */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Size Details</h4>
                      {sizingOption === 'standard' && standardSize && (
                        <p className="text-sm text-gray-600">
                          Standard Size: <span className="font-medium">{standardSize}</span>
                        </p>
                      )}
                      {sizingOption === 'digital' && measurements && (
                        <div className="space-y-1 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>Height: {measurements.height} cm</div>
                            <div>Weight: {measurements.weight} kg</div>
                            <div>Chest: {measurements.chest} cm</div>
                            <div>Waist: {measurements.waist} cm</div>
                            <div>Hips: {measurements.hips} cm</div>
                            <div>Inseam: {measurements.inseam} cm</div>
                            <div>Sleeve: {measurements.sleeveLength} cm</div>
                            <div>Shoulder: {measurements.shoulderWidth} cm</div>
                            <div>Neck: {measurements.neckSize} cm</div>
                          </div>
                        </div>
                      )}
                      {sizingOption === 'appointment' && (
                        <p className="text-sm text-gray-600">
                          Appointment scheduled for professional measurement
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reference Photos */}
              <Card>
                <CardHeader>
                  <CardTitle>Reference Photos (Optional)</CardTitle>
                  <CardDescription>
                    Upload any reference photos to help with the tailoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop files here, or click to select
                    </p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    We'll use this information to contact you about your order
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      placeholder="Any special requirements or notes..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Process */}
              <Card>
                <CardHeader>
                  <CardTitle>What happens next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Order Submitted</p>
                        <p className="text-sm text-gray-600">
                          Your order will be sent to your supervisor for review
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Supervisor Approval</p>
                        <p className="text-sm text-gray-600">
                          Your supervisor will review and approve the order
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Production & Delivery</p>
                        <p className="text-sm text-gray-600">
                          Your uniform will be tailored and delivered
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Previous Step
            </Button>
            
            <Button 
              onClick={handleSubmitOrder}
              disabled={!customerInfo.name || !customerInfo.email || loading}
              size="lg"
            >
              {loading ? 'Submitting Order...' : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Submit Order
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}