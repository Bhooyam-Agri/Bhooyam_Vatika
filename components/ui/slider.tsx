'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from '@/styles/slider.module.css';
import { cn } from '@/lib/utils';

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  api?: {
    prev: () => void;
    next: () => void;
  };
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, api, ...props }, ref) => (
  <div className={styles.sliderContainer}>
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
    <div className={styles.sliderControls}>
      <Button 
        variant="outline" 
        size="icon" 
        className={styles.sliderButton}
        onClick={() => api?.prev?.()}
        disabled={!api?.prev}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={styles.sliderButton}
        onClick={() => api?.next?.()}
        disabled={!api?.next}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
