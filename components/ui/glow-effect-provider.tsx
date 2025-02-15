'use client';

import { useGlowEffect } from '@/hooks/use-glow-effect';

export function GlowEffectProvider({ children }: { children: React.ReactNode }) {
  useGlowEffect();
  return <>{children}</>;
}