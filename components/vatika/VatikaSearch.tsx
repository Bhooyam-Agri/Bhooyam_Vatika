import { SearchInput } from '@/components/ui/search-input';
import { usePlantsStore } from '@/lib/plants';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getPlantImageUrl } from '@/lib/image-utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function VatikaSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchPlants } = usePlantsStore();
  const router = useRouter();
  const searchResults = searchQuery ? searchPlants(searchQuery) : [];

  return (
    <div className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="p-4">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicinal plants..."
              className="w-full"
            />
          </div>
          {searchQuery && searchResults.length > 0 && (
            <div className="border-t max-h-96 overflow-y-auto">
              {searchResults.map((plant) => (
                <Card
                  key={plant.id}
                  className="border-0 rounded-none hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/plant-library/${plant.id}`)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image
                        src={getPlantImageUrl(plant)}
                        alt={plant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{plant.name}</h3>
                      <p className="text-sm text-muted-foreground">{plant.scientificName}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 