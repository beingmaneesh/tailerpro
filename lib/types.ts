export interface UniformModel {
  id: string;
  name: string;
  description: string;
  fabricImage: string;
  colorOptions: string[];
  // category: 'shirt' | 'pants' | 'skirt' | 'blazer' | 'dress';
  category: 'shirt';
  isPublished: boolean;
  createdAt: Date;
  publishedAt?: Date;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  uniformModelId: string;
  uniformModel: UniformModel;
  sizingOption: 'standard' | 'digital' | 'appointment';
  standardSize?: string;
  measurements?: Measurements;
  appointmentId?: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed';
  notes?: string;
  referencePhotos?: string[];
  createdAt: Date;
  approvedAt?: Date;
}

export interface Measurements {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  inseam: number;
  sleeveLength: number;
  shoulderWidth: number;
  neckSize: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'supervisor' | 'customer';
  institution?: string;
  department?: string;
}

export type UserRole = 'supervisor' | 'customer';