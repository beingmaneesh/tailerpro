'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Mail, Phone, Clock, Home } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Submitted Successfully!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. We've received your uniform request and it's being processed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-sm">#ORD-{Date.now().toString().slice(-6)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant="secondary">Pending Approval</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Submitted:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expected Processing:</span>
                  <span>2-3 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Supervisor Review</p>
                    <p className="text-sm text-gray-600">
                      Your supervisor will review your order within 1-2 business days
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Order Approval</p>
                    <p className="text-sm text-gray-600">
                      You'll receive an email notification once your order is approved
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Production Starts</p>
                    <p className="text-sm text-gray-600">
                      Our team will begin tailoring your uniform to your specifications
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-gray-600">
                      Your completed uniform will be delivered within 7-10 business days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@tailorpro.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> Please keep your order ID (#ORD-{Date.now().toString().slice(-6)}) 
                    for reference when contacting support.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Link href="/order">
              <Button className="w-full sm:w-auto">
                Place Another Order
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}