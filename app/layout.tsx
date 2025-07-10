import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/lib/context';


export const metadata: Metadata = {
  title: 'TailorPro - Professional Uniform Tailoring',
  description: 'Streamline your institution\'s uniform procurement with our comprehensive ordering system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}