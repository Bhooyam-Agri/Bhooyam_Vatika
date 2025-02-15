"use client";

import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 transition-transform duration-200 ease-out mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(1)`,
        }}
      />
      <div
        className="pointer-events-none fixed left-0 top-0 z-[999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(1)`,
        }}
      />
    </>
  );
}