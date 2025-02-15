import { useState, useRef, useEffect } from 'react';
import { Plant } from '@/lib/plants';
import { VatikaPlantCard } from './VatikaPlantCard';
import { VatikaRegionSelector } from './VatikaRegionSelector';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getPlantImageUrl } from '@/lib/image-utils';

interface VatikaPlantGridProps {
  plants: Plant[];
  view: 'regions' | 'conditions';
}

export function VatikaPlantGrid({ plants, view }: VatikaPlantGridProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  const conditionGroups = plants.reduce((groups, plant) => {
    plant.conditions.forEach(condition => {
      if (!groups[condition]) {
        groups[condition] = [];
      }
      groups[condition].push(plant);
    });
    return groups;
  }, {} as Record<string, typeof plants>);

  const filteredPlants = plants.filter((plant) => 
    selectedRegion === 'all' || 
    plant.regions.some(region => region.toLowerCase() === selectedRegion.toLowerCase())
  );

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [filteredPlants]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSlide = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleViewAll = () => {
    router.push(`/vatika/region/${selectedRegion}`);
  };

  if (view === 'regions') {
    return (
      <div className="space-y-6">
        <div className="w-full sm:w-64 mx-auto">
          <VatikaRegionSelector 
            plants={plants}
            onRegionChange={setSelectedRegion} 
          />
        </div>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-200",
            showLeftGradient ? "opacity-100" : "opacity-0"
          )} />
          <div className={cn(
            "absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-200",
            showRightGradient ? "opacity-100" : "opacity-0"
          )} />

          {/* Slider Controls */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSlide('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            disabled={!showLeftGradient}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSlide('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            disabled={!showRightGradient}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Scrollable Plants Container */}
          <div
            ref={scrollContainerRef}
            className={cn(
              "overflow-x-auto scrollbar-hide",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-6 px-6 min-w-max">
              {filteredPlants.map((plant) => (
                <div key={plant.id} className="w-[300px] flex-shrink-0">
                  <VatikaPlantCard plant={plant} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button 
            onClick={handleViewAll}
            className="px-8"
          >
            View All {selectedRegion !== 'all' ? selectedRegion : ''} Plants
            {filteredPlants.length > 0 && ` (${filteredPlants.length})`}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Gradient Overlays */}
        <div className={cn(
          "absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-200",
          showLeftGradient ? "opacity-100" : "opacity-0"
        )} />
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-200",
          showRightGradient ? "opacity-100" : "opacity-0"
        )} />

        {/* Slider Controls */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSlide('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          disabled={!showLeftGradient}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSlide('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          disabled={!showRightGradient}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Scrollable Conditions Container */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "overflow-x-auto scrollbar-hide",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex gap-6 px-6 min-w-max">
            {Object.entries(conditionGroups).map(([condition, conditionPlants]) => (
              <div key={condition} className="w-[300px] flex-shrink-0">
                <Card 
                  className="h-full hover:shadow-lg transition-shadow cursor-pointer group"
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
                    <div className="flex flex-wrap gap-2">
                      {conditionPlants.slice(0, 2).map(plant => (
                        <span 
                          key={plant.id}
                          className="text-xs text-muted-foreground"
                        >
                          {plant.name}
                        </span>
                      ))}
                      {conditionPlants.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          and {conditionPlants.length - 2} more...
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Conditions Button */}
      <div className="text-center mt-8">
        <Button 
          onClick={() => router.push('/vatika/conditions')}
          className="px-8"
        >
          View All Conditions ({Object.keys(conditionGroups).length})
        </Button>
      </div>
    </div>
  );
} 