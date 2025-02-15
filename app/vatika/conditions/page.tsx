'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlantsStore } from '@/lib/plants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getPlantImageUrl } from '@/lib/image-utils';
import { VatikaPlantCard } from '@/components/vatika/VatikaPlantCard';

export default function ConditionsPage() {
  const router = useRouter();
  const { plants } = usePlantsStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Group plants by condition
  const conditionGroups = plants.reduce((groups, plant) => {
    plant.conditions.forEach(condition => {
      if (!groups[condition]) {
        groups[condition] = [];
      }
      groups[condition].push(plant);
    });
    return groups;
  }, {} as Record<string, typeof plants>);

  // Filter conditions based on search
  const filteredConditions = Object.entries(conditionGroups).filter(([condition, plants]) => {
    const matchesSearch = 
      !searchQuery ||
      condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plants.some(plant => 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              Browse by Condition
            </h1>
            <p className="text-muted-foreground">
              {Object.keys(conditionGroups).length} conditions available
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mb-8">
          <Input
            placeholder="Search conditions or plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Conditions Grid */}
        {filteredConditions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No conditions found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConditions.map(([condition, conditionPlants]) => (
              <Card 
                key={condition}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/vatika/condition/${encodeURIComponent(condition)}`)}
              >
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {condition}
                  </CardTitle>
                  <CardDescription>
                    {conditionPlants.length} plant{conditionPlants.length !== 1 ? 's' : ''} for this condition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex -space-x-4 mb-4">
                    {conditionPlants.slice(0, 4).map(plant => (
                      <div 
                        key={plant.id}
                        className="w-12 h-12 rounded-full border-2 border-background overflow-hidden"
                      >
                        <img 
                          src={getPlantImageUrl(plant)} 
                          alt={plant.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                    {conditionPlants.length > 4 && (
                      <div className="w-12 h-12 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-sm font-medium">
                        +{conditionPlants.length - 4}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Featured Plants:</h4>
                    <div className="flex flex-wrap gap-2">
                      {conditionPlants.slice(0, 3).map(plant => (
                        <span 
                          key={plant.id}
                          className="text-xs px-2 py-1 bg-primary/10 rounded-full text-muted-foreground"
                        >
                          {plant.name}
                        </span>
                      ))}
                      {conditionPlants.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-primary/10 rounded-full text-muted-foreground">
                          +{conditionPlants.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 