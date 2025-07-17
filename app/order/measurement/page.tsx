'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Ruler, Info } from 'lucide-react';
import { Measurements } from '@/lib/types';
import Image from 'next/image';

const measurementSteps = [
  {
    id: 'height',
    title: 'Height',
    description: 'Stand straight against a wall and measure from floor to top of head',
    unit: 'cm',
    diagram: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'weight',
    title: 'Weight',
    description: 'Step on a scale for accurate weight measurement',
    unit: 'kg',
    diagram: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'chest',
    title: 'Chest',
    description: 'Measure around the fullest part of your chest, under the arms',
    unit: 'cm',
    diagram: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'waist',
    title: 'Waist',
    description: 'Measure around your natural waistline, above the hip bone',
    unit: 'cm',
    diagram: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'hips',
    title: 'Hips',
    description: 'Measure around the fullest part of your hips',
    unit: 'cm',
    diagram: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'inseam',
    title: 'Inseam',
    description: 'Measure from the crotch to the bottom of your leg',
    unit: 'cm',
    diagram: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'sleeveLength',
    title: 'Sleeve Length',
    description: 'Measure from shoulder to wrist with arm slightly bent',
    unit: 'cm',
    diagram: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'shoulderWidth',
    title: 'Shoulder Width',
    description: 'Measure from one shoulder point to the other across the back',
    unit: 'cm',
    diagram: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'neckSize',
    title: 'Neck Size',
    description: 'Measure around the base of your neck where a collar would sit',
    unit: 'cm',
    diagram: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function MeasurementPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [measurements, setMeasurements] = useState<Partial<Measurements>>({});

  useEffect(() => {
    if (!state.currentOrder) {
      router.push('/order');
    }
  }, [state.currentOrder, router]);

  const currentMeasurement = measurementSteps[currentStep];
  const progress = ((currentStep + 1) / measurementSteps.length) * 100;

  const handleInputChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setMeasurements(prev => ({
        ...prev,
        [currentMeasurement.id]: numValue,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < measurementSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All measurements complete
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/order');
    }
  };

  const handleComplete = () => {
    dispatch({
      type: 'UPDATE_CURRENT_ORDER',
      payload: {
        measurements: measurements as Measurements,
      },
    });
    router.push('/order/review');
  };

  const isStepComplete = () => {
    return measurements[currentMeasurement.id as keyof Measurements] !== undefined;
  };

  if (!state.currentOrder) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Digital Measurements
            </h1>
            <p className="text-lg text-gray-600">
              Follow the step-by-step guide to provide accurate measurements
            </p>
          </div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {measurementSteps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={Number(progress.toFixed(2))} className="h-3 bg-gray-200" />
          </div>

          {/* Current Measurement */}
          <Card className="mb-10 shadow-lg border-0 animate-fade-in-scale">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <Ruler className="h-6 w-6 mr-3 text-indigo-600" />
                {currentMeasurement.title}
              </CardTitle>
              <CardDescription className="text-base">
                {currentMeasurement.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Diagram */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl overflow-hidden shadow-inner">
                    <img
                      src={currentMeasurement.diagram}
                      alt={`${currentMeasurement.title} measurement diagram`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <Info className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-indigo-800">
                      <p className="font-medium">Measurement Tips:</p>
                      <p>{currentMeasurement.description}</p>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="measurement" className="text-base font-medium">
                      Enter your {currentMeasurement.title.toLowerCase()} ({currentMeasurement.unit})
                    </Label>
                    <Input
                      id="measurement"
                      type="number"
                      placeholder={`Enter ${currentMeasurement.title.toLowerCase()} in ${currentMeasurement.unit}`}
                      value={measurements[currentMeasurement.id as keyof Measurements] || ''}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="text-lg h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    />
                  </div>

                  {/* Measurement Summary */}
                  <div className="space-y-3 mt-6">
                    <p className="text-base font-medium text-gray-700">
                      Measurements so far:
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {[...measurementSteps.slice(0, currentStep + 1)].reverse().map((step) => (
                        <div
                          key={step.id}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-600">{step.title}:</span>
                          <span className="font-semibold text-indigo-700">
                            {measurements[step.id as keyof Measurements]
                              ? `${measurements[step.id as keyof Measurements]} ${step.unit}`
                              : <span className="text-gray-400">Pending</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handlePrevious} className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 0 ? 'Back to Order' : 'Previous'}
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === measurementSteps.length - 1 ? 'Complete Measurements' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}