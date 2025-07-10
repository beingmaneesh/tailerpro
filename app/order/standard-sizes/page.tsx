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
import { ArrowLeft, ArrowRight, Shirt } from 'lucide-react';

const standardSizes = {
  shirt: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  pants: ['28', '30', '32', '34', '36', '38', '40', '42'],
  skirt: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  blazer: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  dress: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

const sizeGuide = {
  shirt: {
    'XS': 'Chest: 81-86cm',
    'S': 'Chest: 86-91cm',
    'M': 'Chest: 91-96cm',
    'L': 'Chest: 96-101cm',
    'XL': 'Chest: 101-106cm',
    'XXL': 'Chest: 106-111cm',
    'XXXL': 'Chest: 111-116cm',
  },
  pants: {
    '28': 'Waist: 71cm',
    '30': 'Waist: 76cm',
    '32': 'Waist: 81cm',
    '34': 'Waist: 86cm',
    '36': 'Waist: 91cm',
    '38': 'Waist: 96cm',
    '40': 'Waist: 101cm',
    '42': 'Waist: 106cm',
  },
  skirt: {
    'XS': 'Waist: 58-61cm',
    'S': 'Waist: 61-66cm',
    'M': 'Waist: 66-71cm',
    'L': 'Waist: 71-76cm',
    'XL': 'Waist: 76-81cm',
    'XXL': 'Waist: 81-86cm',
  },
  blazer: {
    'XS': 'Chest: 81-86cm',
    'S': 'Chest: 86-91cm',
    'M': 'Chest: 91-96cm',
    'L': 'Chest: 96-101cm',
    'XL': 'Chest: 101-106cm',
    'XXL': 'Chest: 106-111cm',
    'XXXL': 'Chest: 111-116cm',
  },
  dress: {
    'XS': 'Bust: 78-81cm',
    'S': 'Bust: 81-86cm',
    'M': 'Bust: 86-91cm',
    'L': 'Bust: 91-96cm',
    'XL': 'Bust: 96-101cm',
    'XXL': 'Bust: 101-106cm',
  },
};

export default function StandardSizesPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (!state.currentOrder) {
      router.push('/order');
    }
  }, [state.currentOrder, router]);

  const handleContinue = () => {
    dispatch({
      type: 'UPDATE_CURRENT_ORDER',
      payload: {
        standardSize: selectedSize,
        // Add color selection to the order
        notes: `Color: ${selectedColor}`,
      },
    });
    router.push('/order/review');
  };

  const handleBack = () => {
    router.push('/order');
  };

  if (!state.currentOrder || !state.currentOrder.uniformModel) {
    return null;
  }

  const uniformModel = state.currentOrder.uniformModel;
  const availableSizes = standardSizes[uniformModel.category as keyof typeof standardSizes];
  const sizeGuideForCategory = sizeGuide[uniformModel.category as keyof typeof sizeGuide];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Select Standard Size
            </h1>
            <p className="text-gray-600">
              Choose your size for {uniformModel.name}
            </p>
          </div>

          {/* Selected Model */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shirt className="h-5 w-5 mr-2 text-blue-600" />
                Selected Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <img
                  src={uniformModel.fabricImage}
                  alt={uniformModel.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{uniformModel.name}</h3>
                  <p className="text-gray-600">{uniformModel.description}</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {uniformModel.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Color</CardTitle>
                <CardDescription>
                  Choose your preferred color option
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                  <div className="space-y-2">
                    {uniformModel.colorOptions.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <RadioGroupItem value={color} id={color} />
                        <Label htmlFor={color} className="cursor-pointer">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Size Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Size</CardTitle>
                <CardDescription>
                  Choose your size from our standard sizing chart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                  <div className="grid grid-cols-2 gap-3">
                    {availableSizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <RadioGroupItem value={size} id={size} />
                        <Label htmlFor={size} className="cursor-pointer">
                          <div className="flex flex-col">
                            <span className="font-medium">{size}</span>
                            <span className="text-xs text-gray-500">
                              {sizeGuideForCategory[size as keyof typeof sizeGuideForCategory]}
                            </span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Size Guide */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Size Guide</CardTitle>
              <CardDescription>
                Reference measurements for {uniformModel.category}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(sizeGuideForCategory).map(([size, measurement]) => (
                  <div key={size} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-lg">{size}</div>
                    <div className="text-sm text-gray-600">{measurement}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Order
            </Button>
            
            <Button 
              onClick={handleContinue}
              disabled={!selectedSize || !selectedColor}
            >
              Continue to Review
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}