"use client";

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function RevealOnScroll({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (ref.current) {
                ref.current.style.opacity = '1';
                ref.current.style.transform = 'translateY(0)';
              }
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
      }}
      className={className}
    >
      {children}
    </div>
  );
}