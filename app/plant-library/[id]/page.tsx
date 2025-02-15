'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bookmark, BookmarkCheck, Book, MessageCircle, ChevronLeft } from 'lucide-react';
import { usePlantAI } from '@/hooks/use-plant-ai';
import { Plant, usePlantsStore } from '@/lib/plants';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRecipesStore } from '@/lib/recipes';

export default function PlantPage() {
  const params = useParams();
  const router = useRouter();
  const { plants, bookmarkedPlants, addBookmark, removeBookmark } = usePlantsStore();
  const { getRecipesByPlant } = useRecipesStore();
  const { toast } = useToast();
  const { isLoading: isAiLoading, response: aiResponse, askAboutPlant } = usePlantAI();
  const [query, setQuery] = useState('');

  const plant = plants.find(p => p.id === params.id) as Plant;
  const recipes = plant ? getRecipesByPlant(plant.id) : [];

  if (!plant) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Plant not found</h1>
            <Button onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAskAI = async () => {
    if (!query.trim()) return;
    await askAboutPlant(plant.name, plant.scientificName, query);
    setQuery('');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Plant Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <img 
              src={plant.image} 
              alt={plant.name} 
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">{plant.name}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (bookmarkedPlants.includes(plant.id)) {
                    removeBookmark(plant.id);
                    toast({
                      title: "Removed from bookmarks",
                      description: `${plant.name} has been removed from your bookmarks.`
                    });
                  } else {
                    addBookmark(plant.id);
                    toast({
                      title: "Added to bookmarks",
                      description: `${plant.name} has been added to your bookmarks.`
                    });
                  }
                }}
              >
                {bookmarkedPlants.includes(plant.id) 
                  ? <BookmarkCheck className="h-6 w-6" />
                  : <Bookmark className="h-6 w-6" />
                }
              </Button>
            </div>
            <p className="text-lg text-muted-foreground italic mb-4">{plant.scientificName}</p>
            <p className="text-muted-foreground mb-6">{plant.description}</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Native Regions</h3>
                <div className="flex flex-wrap gap-2">
                  {plant.regions.map(region => (
                    <span key={region} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Medicinal Uses</h3>
                <div className="flex flex-wrap gap-2">
                  {plant.conditions.map(condition => (
                    <span key={condition} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipes Section */}
        {recipes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Medicinal Recipes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription>{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/vatika/recipes/${recipe.id}`}>
                      <Button variant="outline" className="w-full">
                        <Book className="h-4 w-4 mr-2" />
                        View Recipe
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="ai" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ai">
              <MessageCircle className="h-4 w-4 mr-2" />
              Ask AI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ask about {plant.name}</CardTitle>
                <CardDescription>
                  Get personalized answers about this plant's medicinal properties and uses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask anything about this plant..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAskAI();
                      }
                    }}
                  />
                  <Button onClick={handleAskAI} disabled={isAiLoading}>
                    {isAiLoading ? 'Thinking...' : 'Ask'}
                  </Button>
                </div>

                {aiResponse && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="whitespace-pre-wrap">{aiResponse}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}