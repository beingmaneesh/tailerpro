'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Shirt, Ruler, Calendar, ArrowRight } from 'lucide-react';
import { mockUniformModels } from '@/lib/mock-data';

export default function OrderPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [sizingOption, setSizingOption] = useState<'standard' | 'digital' | 'appointment'>('standard');

  useEffect(() => {
    if (state.uniformModels.length === 0) {
      dispatch({ type: 'SET_UNIFORM_MODELS', payload: mockUniformModels });
    }
  }, [state.uniformModels.length, dispatch]);

  const publishedModels = state.uniformModels.filter(model => model.isPublished);

  const handleContinue = () => {
    if (!selectedModel) return;

    const model = state.uniformModels.find(m => m.id === selectedModel);
    if (!model) return;

    dispatch({
      type: 'SET_CURRENT_ORDER',
      payload: {
        uniformModelId: selectedModel,
        uniformModel: model,
        sizingOption,
      },
    });

    switch (sizingOption) {
      case 'standard':
        router.push('/order/standard-sizes');
        break;
      case 'digital':
        router.push('/order/measurement');
        break;
      case 'appointment':
        router.push('/order/appointment');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Your Uniform
            </h1>
            <p className="text-gray-600">
              Select a uniform model and choose your preferred sizing option
            </p>
          </div>

          {/* Step 1: Select Uniform Model */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Step 1: Select Uniform Model
            </h2>
            
            {publishedModels.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">
                    No uniform models are currently available. Please contact your supervisor.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedModels.map((model) => (
                  <Card
                    key={model.id}
                    className={`cursor-pointer transition-colors ${
                      selectedModel === model.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src={model.fabricImage}
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="default">Available</Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{model.name}</CardTitle>
                          <CardDescription>{model.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {model.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Available Colors:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {model.colorOptions.map((color) => (
                            <Badge key={color} variant="outline" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Choose Sizing Option */}
          {selectedModel && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Step 2: Choose Sizing Option
              </h2>
              
              <RadioGroup value={sizingOption} onValueChange={(value: any) => setSizingOption(value)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Standard Sizes */}
                  <Card className={`cursor-pointer transition-colors ${
                    sizingOption === 'standard' ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <Shirt className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Standard Sizes</span>
                          </div>
                        </Label>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">
                        Choose from standard sizes (S, M, L, XL, XXL)
                      </p>
                      <div className="text-xs text-gray-500">
                        ✓ Quick and easy<br />
                        ✓ Immediate processing<br />
                        ✓ Standard fit
                      </div>
                    </CardContent>
                  </Card>

                  {/* Digital Measurements */}
                  <Card className={`cursor-pointer transition-colors ${
                    sizingOption === 'digital' ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="digital" id="digital" />
                        <Label htmlFor="digital" className="cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <Ruler className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Digital Measurements</span>
                          </div>
                        </Label>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">
                        Provide your measurements through our guided wizard
                      </p>
                      <div className="text-xs text-gray-500">
                        ✓ Custom fit<br />
                        ✓ Step-by-step guidance<br />
                        ✓ Visual diagrams
                      </div>
                    </CardContent>
                  </Card>

                  {/* Offline Appointment */}
                  <Card className={`cursor-pointer transition-colors ${
                    sizingOption === 'appointment' ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="appointment" id="appointment" />
                        <Label htmlFor="appointment" className="cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Book Appointment</span>
                          </div>
                        </Label>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">
                        Schedule an in-person measurement session
                      </p>
                      <div className="text-xs text-gray-500">
                        ✓ Professional fitting<br />
                        ✓ Perfect measurements<br />
                        ✓ Personal consultation
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Continue Button */}
          {selectedModel && (
            <div className="flex justify-center">
              <Button size="lg" onClick={handleContinue}>
                Continue to Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}