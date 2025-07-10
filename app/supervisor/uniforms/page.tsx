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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { FabricSelector } from '@/components/ui/fabric-selector';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { UniformModel } from '@/lib/types';
import { mockUniformModels } from '@/lib/mock-data';
import { FabricOption } from '@/lib/fabric-catalog';

export default function UniformModelsPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<UniformModel | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<FabricOption | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    colorOptions: [] as string[],
    category: 'shirt' as const,
  });

  useEffect(() => {
    if (!state.user || state.user.role !== 'supervisor') {
      router.push('/login');
      return;
    }

    if (state.uniformModels.length === 0) {
      dispatch({ type: 'SET_UNIFORM_MODELS', payload: mockUniformModels });
    }
  }, [state.user, router, dispatch, state.uniformModels.length]);

  const handleCreateModel = () => {
    if (!selectedFabric) return;
    
    const newModel: UniformModel = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      fabricImage: selectedFabric.image,
      colorOptions: formData.colorOptions.length > 0 ? formData.colorOptions : ['Default'],
      category: formData.category,
      isPublished: false,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_UNIFORM_MODEL', payload: newModel });
    setIsCreateModalOpen(false);
    setSelectedFabric(null);
    resetForm();
  };

  const handleUpdateModel = () => {
    if (!editingModel) return;

    const fabricImage = selectedFabric ? selectedFabric.image : editingModel.fabricImage;
    
    const updatedModel: UniformModel = {
      ...editingModel,
      name: formData.name,
      description: formData.description,
      fabricImage,
      colorOptions: formData.colorOptions.length > 0 ? formData.colorOptions : editingModel.colorOptions,
      category: formData.category,
    };

    dispatch({ type: 'UPDATE_UNIFORM_MODEL', payload: updatedModel });
    setEditingModel(null);
    setSelectedFabric(null);
    resetForm();
  };

  const handleDeleteModel = (modelId: string) => {
    dispatch({ type: 'DELETE_UNIFORM_MODEL', payload: modelId });
  };

  const handleTogglePublish = (model: UniformModel) => {
    const updatedModel = {
      ...model,
      isPublished: !model.isPublished,
      publishedAt: !model.isPublished ? new Date() : undefined,
    };
    dispatch({ type: 'UPDATE_UNIFORM_MODEL', payload: updatedModel });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      colorOptions: [],
      category: 'shirt',
    });
  };

  const openEditModal = (model: UniformModel) => {
    setEditingModel(model);
    setSelectedFabric(null); // Reset fabric selection for editing
    setFormData({
      name: model.name,
      description: model.description,
      colorOptions: model.colorOptions,
      category: model.category,
    });
  };

  if (!state.user || state.user.role !== 'supervisor') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Uniform Models
            </h1>
            <p className="text-gray-600">
              Manage and publish uniform models for your institution
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Model
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Uniform Model</DialogTitle>
                <DialogDescription>
                  Add a new uniform model to your collection
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Model Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Classic School Shirt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={formData.category} onValueChange={(value: any) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shirt">Shirt</SelectItem>
                        <SelectItem value="pants">Pants</SelectItem>
                        <SelectItem value="skirt">Skirt</SelectItem>
                        <SelectItem value="blazer">Blazer</SelectItem>
                        <SelectItem value="dress">Dress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the uniform model..."
                  />
                </div>
                
                <FabricSelector
                  selectedFabric={selectedFabric}
                  onFabricSelect={setSelectedFabric}
                />
                
                <div className="space-y-2">
                  <Label>Color Options (comma-separated)</Label>
                  <Input
                    value={formData.colorOptions.join(', ')}
                    onChange={(e) => setFormData({...formData, colorOptions: e.target.value.split(', ').filter(color => color.trim())})}
                    placeholder="White, Light Blue, Navy"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                    setEditingModel(null);
                    setSelectedFabric(null);
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateModel}
                    disabled={!selectedFabric || !formData.name}
                  >
                    Create Model
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.uniformModels.map((model) => (
            <Card key={model.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={model.fabricImage}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={model.isPublished ? 'default' : 'secondary'}>
                    {model.isPublished ? 'Published' : 'Draft'}
                  </Badge>
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
                <div className="space-y-3">
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
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={model.isPublished}
                        onCheckedChange={() => handleTogglePublish(model)}
                      />
                      <span className="text-sm text-gray-600">
                        {model.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(model)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteModel(model.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Modal */}
        <Dialog open={!!editingModel} onOpenChange={() => {
          setEditingModel(null);
          setSelectedFabric(null);
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Uniform Model</DialogTitle>
              <DialogDescription>
                Update the uniform model details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Model Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Classic School Shirt"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shirt">Shirt</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="skirt">Skirt</SelectItem>
                      <SelectItem value="blazer">Blazer</SelectItem>
                      <SelectItem value="dress">Dress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the uniform model..."
                />
              </div>
              
              {editingModel && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Current Fabric</h4>
                    <div className="flex items-center space-x-3">
                      <img
                        src={editingModel.fabricImage}
                        alt="Current fabric"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <span className="text-sm text-gray-600">
                        Leave fabric selection empty to keep current fabric, or select a new one below
                      </span>
                    </div>
                  </div>
                  
                  <FabricSelector
                    selectedFabric={selectedFabric}
                    onFabricSelect={setSelectedFabric}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Color Options (comma-separated)</Label>
                <Input
                  value={formData.colorOptions.join(', ')}
                  onChange={(e) => setFormData({...formData, colorOptions: e.target.value.split(', ').filter(color => color.trim())})}
                  placeholder="White, Light Blue, Navy"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingModel(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateModel}>
                  Update Model
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}