'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { UniformModel, Order, Appointment, User, Measurements } from './types';

interface AppState {
  user: User | null;
  uniformModels: UniformModel[];
  orders: Order[];
  appointments: Appointment[];
  currentOrder: Partial<Order> | null;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_UNIFORM_MODELS'; payload: UniformModel[] }
  | { type: 'ADD_UNIFORM_MODEL'; payload: UniformModel }
  | { type: 'UPDATE_UNIFORM_MODEL'; payload: UniformModel }
  | { type: 'DELETE_UNIFORM_MODEL'; payload: string }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'SET_APPOINTMENTS'; payload: Appointment[] }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT'; payload: Appointment }
  | { type: 'SET_CURRENT_ORDER'; payload: Partial<Order> | null }
  | { type: 'UPDATE_CURRENT_ORDER'; payload: Partial<Order> };

const initialState: AppState = {
  user: null,
  uniformModels: [],
  orders: [],
  appointments: [],
  currentOrder: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_UNIFORM_MODELS':
      return { ...state, uniformModels: action.payload };
    case 'ADD_UNIFORM_MODEL':
      return { ...state, uniformModels: [...state.uniformModels, action.payload] };
    case 'UPDATE_UNIFORM_MODEL':
      return {
        ...state,
        uniformModels: state.uniformModels.map(model =>
          model.id === action.payload.id ? action.payload : model
        ),
      };
    case 'DELETE_UNIFORM_MODEL':
      return {
        ...state,
        uniformModels: state.uniformModels.filter(model => model.id !== action.payload),
      };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        ),
      };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment.id === action.payload.id ? action.payload : appointment
        ),
      };
    case 'SET_CURRENT_ORDER':
      return { ...state, currentOrder: action.payload };
    case 'UPDATE_CURRENT_ORDER':
      return {
        ...state,
        currentOrder: state.currentOrder ? { ...state.currentOrder, ...action.payload } : action.payload,
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}