'use client';

import { useApp } from '@/lib/context';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-700 to-blue-600 text-white font-bold shadow-lg">
              T
            </div>
            <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>TailorPro</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 font-medium">
              About
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {state.user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {state.user.name}
                  </span>
                </div>
                {state.user.role === 'supervisor' && (
                  <Link href="/supervisor">
                    <Button variant="outline" size="sm" className="hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200">
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200">
                    Login
                  </Button>
                </Link>
                <Link href="/order">
                  <Button size="sm" className="btn-primary">
                    Order Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}