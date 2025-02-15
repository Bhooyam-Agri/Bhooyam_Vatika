import { Leaf } from 'lucide-react';

export function PlantImagePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-muted/50 rounded-lg">
      <Leaf className="w-12 h-12 text-primary/50" />
      <p className="text-sm text-muted-foreground mt-2">Plant Image</p>
    </div>
  );
} 