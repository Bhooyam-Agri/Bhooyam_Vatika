'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plant, usePlantsStore } from '@/lib/plants';
import { VatikaPlantCard } from '@/components/vatika/VatikaPlantCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function RegionPlantsPage() {
  const params = useParams();
  const router = useRouter();
  const { plants } = usePlantsStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  const region = decodeURIComponent(params.region as string);
  
  const filteredPlants = plants.filter((plant) => {
    const matchesRegion = region === 'all' || 
      plant.regions.some(r => r.toLowerCase() === region.toLowerCase());
    const matchesSearch = 
      !searchQuery ||
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesRegion && matchesSearch;
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
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {region === 'all' ? 'All Plants' : `Plants from ${region}`}
            </h1>
            <p className="text-muted-foreground">
              {filteredPlants.length} plant{filteredPlants.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mb-8">
          <Input
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Plants Grid */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No plants found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <VatikaPlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 