'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SearchInput } from '@/components/ui/search-input';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { usePlantsStore } from '@/lib/plants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Leaf, Bookmark, BookmarkCheck, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlantImagePlaceholder } from '@/components/ui/plant-image-placeholder';
import { RecipeQuestionnaire } from '@/components/recipe-questionnaire';
import { getPlantImageUrl, preloadAllPlantImages } from '@/lib/image-utils';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';
import { VatikaPlantGrid } from '@/components/vatika/VatikaPlantGrid';

export default function VatikaPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { initialize, plants, dailyPlant, bookmarkedPlants, addBookmark, removeBookmark } = usePlantsStore();
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [regionSearchQuery, setRegionSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializePlants = async () => {
      if (!mounted) return;
      
      try {
        setIsLoading(true);
        setError(null);
        await initialize();
        
        // Only preload images if the component is still mounted
        if (mounted && plants.length > 0) {
          await preloadAllPlantImages(plants);
        }
      } catch (err) {
        if (mounted) {
          console.error('Failed to initialize plants:', err);
          setError('Failed to load plants. Please try refreshing the page.');
          toast({
            title: "Error",
            description: "Failed to load plants. Please try refreshing the page.",
            variant: "destructive"
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializePlants();

    // Cleanup function to prevent memory leaks
    return () => {
      mounted = false;
    };
  }, [initialize, toast]); // Only include stable dependencies

  // Group plants by region and condition
  const regionGroups = plants.reduce((groups, plant) => {
    plant.regions.forEach(region => {
      if (!groups[region]) {
        groups[region] = [];
      }
      groups[region].push(plant);
    });
    return groups;
  }, {} as Record<string, typeof plants>);

  // Filter regions and plants based on search query
  const filteredRegionGroups = Object.entries(regionGroups).reduce((filtered, [region, plants]) => {
    const matchingPlants = plants.filter(plant => 
      region.toLowerCase().includes(regionSearchQuery.toLowerCase()) ||
      plant.name.toLowerCase().includes(regionSearchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(regionSearchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(regionSearchQuery.toLowerCase()) ||
      plant.uses.some(use => use.toLowerCase().includes(regionSearchQuery.toLowerCase())) ||
      plant.conditions.some(condition => condition.toLowerCase().includes(regionSearchQuery.toLowerCase()))
    );
    
    if (matchingPlants.length > 0) {
      filtered[region] = matchingPlants;
    }
    return filtered;
  }, {} as Record<string, typeof plants>);

  const conditionGroups = plants.reduce((groups, plant) => {
    plant.conditions.forEach(condition => {
      if (!groups[condition]) {
        groups[condition] = [];
      }
      groups[condition].push(plant);
    });
    return groups;
  }, {} as Record<string, typeof plants>);

  const handleBookmark = (plantId: string) => {
    if (bookmarkedPlants.includes(plantId)) {
      removeBookmark(plantId);
      toast({
        title: "Removed from bookmarks",
        description: "Plant has been removed from your bookmarks"
      });
    } else {
      addBookmark(plantId);
      toast({
        title: "Added to bookmarks",
        description: "Plant has been added to your bookmarks"
      });
    }
  };

  const handlePlantClick = (plantId: string) => {
    router.push(`/plant-library/${plantId}`);
  };

  const handleRefreshPlant = () => {
    const randomIndex = Math.floor(Math.random() * plants.length);
    const newDailyPlant = plants[randomIndex];
    usePlantsStore.setState({ 
      dailyPlant: newDailyPlant,
      lastRotated: new Date().toDateString()
    });
    toast({
      title: "Plant of the Day Updated",
      description: `New plant: ${newDailyPlant.name}`
    });
  };

  return (
    <div className="min-h-screen gradient-page gradient-dark">
      <Navigation />
      
      {/* Header */}
      <div className="fixed top-16 w-full bg-background/95 backdrop-blur-sm border-b z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-16">
            {/* Search */}
            <div className="w-96">
              <SearchInput 
                placeholder="Search medicinal plants..." 
                onSelect={(plant) => handlePlantClick(plant.id)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-40 pb-32">
        {/* Error State */}
        {error && (
          <Card className="mt-8 mb-12 border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="mt-8 mb-12">
            <CardHeader>
              <CardTitle>Loading Plants...</CardTitle>
              <CardDescription>Please wait while we fetch the medicinal plants data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily Plant Section */}
        {!isLoading && !error && dailyPlant && (
          <Card className="mt-8 mb-12">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daily Medicinal Plant</CardTitle>
                  <CardDescription>Learn something new about medicinal plants every day</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRefreshPlant}
                    title="Change Plant of the Day"
                  >
                    <RefreshCw className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBookmark(dailyPlant.id)}
                  >
                    {bookmarkedPlants.includes(dailyPlant.id) ? (
                      <BookmarkCheck className="h-6 w-6" />
                    ) : (
                      <Bookmark className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="h-64">
                {dailyPlant && (
                  <img 
                    src={getPlantImageUrl(dailyPlant)} 
                    alt={dailyPlant.name}
                    className="w-full h-full object-cover rounded-lg"
                    loading="eager"
                  />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{dailyPlant.name}</h3>
                <p className="text-sm text-muted-foreground italic mb-4">{dailyPlant.scientificName}</p>
                <p className="text-muted-foreground mb-4">{dailyPlant.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dailyPlant.conditions.map((condition) => (
                    <span key={condition} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {condition}
                    </span>
                  ))}
                </div>
                <Button 
                  onClick={() => handlePlantClick(dailyPlant.id)}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="regions" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2">
            <TabsTrigger value="regions">
              <Map className="h-4 w-4 mr-2" />
              By Region
            </TabsTrigger>
            <TabsTrigger value="conditions">
              <Leaf className="h-4 w-4 mr-2" />
              By Condition
            </TabsTrigger>
          </TabsList>

          <TabsContent value="regions">
            {!isLoading && !error && (
              <VatikaPlantGrid plants={plants} view="regions" />
            )}
          </TabsContent>

          <TabsContent value="conditions">
            {!isLoading && !error && (
              <VatikaPlantGrid plants={plants} view="conditions" />
            )}
          </TabsContent>
        </Tabs>

        {/* Recipe Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Looking for Medicinal Recipes?</h2>
          <p className="text-muted-foreground mb-6">
            Explore our collection of traditional medicinal plant recipes
          </p>
          <Button 
            size="lg" 
            className="rounded-full"
            onClick={() => setRecipeDialogOpen(true)}
          >
            Browse Recipes
          </Button>
        </div>

        <RecipeQuestionnaire 
          open={recipeDialogOpen} 
          onOpenChange={setRecipeDialogOpen}
        />
      </div>
    </div>
  );
}