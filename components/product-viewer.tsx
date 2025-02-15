"use client";

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductViewerProps {
  product: any;
}

export function ProductViewer({ product }: ProductViewerProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-background/50 to-background border border-border/50 transition-all duration-300 hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6">
        <div className="aspect-square rounded-xl overflow-hidden mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">{product.name}</h3>
          <p className="text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">${product.price}</span>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}