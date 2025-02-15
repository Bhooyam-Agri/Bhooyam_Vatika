'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { GlowEffectProvider } from '@/components/ui/glow-effect-provider';
import { StoreInitializer } from '@/components/store-initializer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlowEffectProvider>
            <StoreInitializer />
            <CustomCursor />
            {children}
            <Toaster />
          </GlowEffectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}