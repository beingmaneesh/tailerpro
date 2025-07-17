'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Info } from 'lucide-react';
import { fabricCatalog, fabricCategories, FabricOption } from '@/lib/fabric-catalog';

interface FabricSelectorProps {
  selectedFabric?: FabricOption | null;
  onFabricSelect: (fabric: FabricOption) => void;
}

export function FabricSelector({ selectedFabric, onFabricSelect }: FabricSelectorProps) {
  const [activeCategory, setActiveCategory] = useState('cotton') ;

  const getFabricsByCategory = (category: string) => {
    return fabricCatalog.filter(fabric => fabric.category === category);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Select Fabric from Catalog
        </h3>
        <p className="text-sm text-gray-600">
          Choose from our premium fabric collection organized by category
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {Object.entries(fabricCategories).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(fabricCategories).map(([categoryKey, category]) => (
          <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
              <div className="text-2xl mb-2">{category.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {category.name}
              </h4>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFabricsByCategory(categoryKey).map((fabric) => (
                <Card
                  key={fabric.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    selectedFabric?.id === fabric.id
                      ? 'ring-2 ring-indigo-500 shadow-lg'
                      : 'hover:ring-1 hover:ring-indigo-300'
                  }`}
                  onClick={() => onFabricSelect(fabric)}
                >
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={fabric.image}
                        alt={fabric.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    {selectedFabric?.id === fabric.id && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {fabric.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {fabric.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        <Badge variant="outline" className="text-xs">
                          {fabric.texture}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {fabric.weight}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {selectedFabric && (
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 animate-fade-in-scale">
          <CardHeader>
            <CardTitle className="flex items-center text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Info className="h-5 w-5 mr-2 text-indigo-600" />
              Selected Fabric
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <img
                src={selectedFabric.image}
                alt={selectedFabric.name}
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{selectedFabric.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedFabric.description}</p>
                <div className="flex space-x-2">
                  <Badge variant="secondary">{fabricCategories[selectedFabric.category as keyof typeof fabricCategories].name}</Badge>
                  <Badge variant="outline">{selectedFabric.texture}</Badge>
                  <Badge variant="outline">{selectedFabric.weight}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}