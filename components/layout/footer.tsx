import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-700 to-blue-600 text-white font-bold shadow-lg">
                T
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>TailorPro</span>
            </div>
            <p className="text-gray-400">
              Professional uniform tailoring services for schools and organizations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>School Uniforms</li>
              <li>Corporate Wear</li>
              <li>Custom Tailoring</li>
              <li>Alterations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Order Portal</li>
              <li>Size Guide</li>
              <li>Supervisor Login</li>
              <li>Track Order</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@tailorpro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Tailor St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TailorPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}