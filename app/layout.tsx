import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { GlowEffectProvider } from '@/components/ui/glow-effect-provider';
import { StoreInitializer } from '@/components/store-initializer';
import { RootLayoutClient } from './layout-client';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Bhooyam - Smart Hydroponic Solutions',
  description: 'Advanced hydroponic growing solutions powered by artificial intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}