import { UniformModel, Order, Appointment, User } from './types';

export const mockUniformModels: UniformModel[] = [
  {
    id: '1',
    name: 'Classic School Shirt',
    description: 'Traditional white cotton shirt with school logo',
    fabricImage: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    colorOptions: ['White', 'Light Blue', 'Navy'],
    category: 'shirt',
    isPublished: true,
    createdAt: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Formal Trousers',
    description: 'Dark grey formal trousers with adjustable waist',
    fabricImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
    colorOptions: ['Dark Grey', 'Navy', 'Black'],
    category: 'pants',
    isPublished: true,
    createdAt: new Date('2024-01-16'),
    publishedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    name: 'School Blazer',
    description: 'Premium wool blend blazer with school crest',
    fabricImage: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    colorOptions: ['Navy', 'Maroon', 'Forest Green'],
    category: 'blazer',
    isPublished: false,
    createdAt: new Date('2024-01-17'),
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    uniformModelId: '1',
    uniformModel: mockUniformModels[0],
    sizingOption: 'standard',
    standardSize: 'M',
    status: 'pending',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    uniformModelId: '2',
    uniformModel: mockUniformModels[1],
    sizingOption: 'digital',
    measurements: {
      height: 165,
      weight: 60,
      chest: 85,
      waist: 70,
      hips: 90,
      inseam: 75,
      sleeveLength: 60,
      shoulderWidth: 40,
      neckSize: 35,
    },
    status: 'approved',
    createdAt: new Date('2024-01-21'),
    approvedAt: new Date('2024-01-22'),
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerId: '3',
    customerName: 'Alice Johnson',
    customerEmail: 'alice.johnson@email.com',
    date: new Date('2024-01-25'),
    timeSlot: '10:00 AM',
    status: 'scheduled',
    createdAt: new Date('2024-01-23'),
  },
  {
    id: '2',
    customerId: '4',
    customerName: 'Bob Wilson',
    customerEmail: 'bob.wilson@email.com',
    date: new Date('2024-01-26'),
    timeSlot: '2:00 PM',
    status: 'completed',
    createdAt: new Date('2024-01-24'),
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'supervisor@school.edu',
    name: 'Mary Johnson',
    role: 'supervisor',
    institution: 'Springfield High School',
    department: 'Administration',
  },
  {
    id: '2',
    email: 'parent@email.com',
    name: 'David Smith',
    role: 'customer',
  },
];