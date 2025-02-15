import React from 'react';
import { Plant } from '@/lib/plants';
import { PlantCard } from './PlantCard';

interface PlantGridProps {
  plants: Plant[];
  onPlantClick?: (plant: Plant) => void;
}

export function PlantGrid({ plants, onPlantClick }: PlantGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onClick={() => onPlantClick?.(plant)}
        />
      ))}
    </div>
  );
}