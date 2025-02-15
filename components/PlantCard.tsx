import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PlantCardProps {
  plant: {
    id: string;
    name: string;
    scientificName: string;
    description: string;
  };
  onClick?: () => void;
}

export function PlantCard({ plant, onClick }: PlantCardProps) {
  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{plant.name}</CardTitle>
        <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{plant.description}</p>
      </CardContent>
    </Card>
  );
}