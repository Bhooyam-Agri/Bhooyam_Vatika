'use client';

import { usePlantsStore } from '@/lib/plants';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Bookmark } from 'lucide-react';

export function PlantOfTheDay() {
  const { dailyPlant, bookmarkedPlants, addBookmark, removeBookmark } = usePlantsStore();

  if (!dailyPlant) return null;

  const isBookmarked = bookmarkedPlants.includes(dailyPlant.id);

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(dailyPlant.id);
    } else {
      addBookmark(dailyPlant.id);
    }
  };

  return (
    <div className="w-full">
      <Card className="bg-card">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">Daily Medicinal Plant</h2>
              <p className="text-muted-foreground">Learn something new about medicinal plants every day</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleBookmark}>
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2">{dailyPlant.name}</h3>
              <p className="text-sm text-muted-foreground italic mb-4">{dailyPlant.scientificName}</p>
              <p className="text-muted-foreground mb-4">{dailyPlant.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {dailyPlant.conditions?.map((condition, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}