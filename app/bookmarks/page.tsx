'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Loader2, Clock, Tag, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Plant } from '@/lib/plants';
import Image from 'next/image';
import { getPlantImageUrl } from '@/lib/image-utils';
import { format } from 'date-fns';

interface Recipe {
  _id?: string;
  userId: string;
  name: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  warnings?: string[];
  isBookmarked?: boolean;
  symptoms?: string;
  conditions?: string;
  allergies?: string;
  preferences?: string;
  preparationTime?: string;
  category?: string;
  medicinalUses?: string[];
  dosage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function BookmarksPage() {
  const [savedPlants, setSavedPlants] = useState<Plant[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    const fetchBookmarks = async () => {
      try {
        // Fetch saved plants
        const plantsResponse = await fetch(`/api/plants/bookmarks?userId=${user?.uid}`);
        if (plantsResponse.ok) {
          const plantsData = await plantsResponse.json();
          setSavedPlants(plantsData);
        }

        // Fetch saved recipes
        const recipesResponse = await fetch(`/api/recipes?userId=${user?.uid}`);
        if (recipesResponse.ok) {
          const recipesData = await recipesResponse.json();
          setSavedRecipes(recipesData.filter((recipe: Recipe) => recipe.isBookmarked));
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        toast({
          title: "Error",
          description: "Failed to fetch bookmarks",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user, isAuthenticated, router, toast]);

  const handleRemovePlantBookmark = async (plantId: string) => {
    try {
      const response = await fetch(`/api/plants/bookmarks/${plantId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.uid })
      });

      if (response.ok) {
        setSavedPlants(plants => plants.filter(p => p.id !== plantId));
        toast({
          title: "Success",
          description: "Plant removed from bookmarks"
        });
      }
    } catch (error) {
      console.error('Error removing plant bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to remove bookmark",
        variant: "destructive"
      });
    }
  };

  const handleRemoveRecipeBookmark = async (recipeId: string) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeId,
          isBookmarked: false
        })
      });

      if (response.ok) {
        setSavedRecipes(recipes => recipes.filter(r => r._id !== recipeId));
        toast({
          title: "Success",
          description: "Recipe removed from bookmarks"
        });
      }
    } catch (error) {
      console.error('Error removing recipe bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to remove bookmark",
        variant: "destructive"
      });
    }
  };

  const RecipeDialog = ({ recipe, open, onOpenChange }: { recipe: Recipe | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!recipe) return null;

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{recipe.name}</DialogTitle>
            <DialogDescription>
              {recipe.description}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 px-1">
            <div className="space-y-6 py-4">
              {(recipe.preparationTime || recipe.category) && (
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {recipe.preparationTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.preparationTime}
                    </div>
                  )}
                  {recipe.category && (
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {recipe.category}
                    </div>
                  )}
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-muted-foreground">{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-muted-foreground">{instruction}</li>
                  ))}
                </ol>
              </div>

              {recipe.benefits && recipe.benefits.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.benefits.map((benefit, index) => (
                      <li key={index} className="text-muted-foreground">{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.medicinalUses && recipe.medicinalUses.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Medicinal Uses</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.medicinalUses.map((use, index) => (
                      <li key={index} className="text-muted-foreground">{use}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.dosage && (
                <div>
                  <h3 className="font-semibold mb-2">Dosage</h3>
                  <p className="text-muted-foreground">{recipe.dosage}</p>
                </div>
              )}

              {recipe.warnings && recipe.warnings.length > 0 && (
                <div className="bg-destructive/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <h3 className="font-semibold">Warnings & Precautions</h3>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.warnings.map((warning, index) => (
                      <li key={index} className="text-muted-foreground">{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <p>Created: {format(new Date(recipe.createdAt!), 'PPP')}</p>
                {recipe.symptoms && <p>Symptoms: {recipe.symptoms}</p>}
                {recipe.conditions && <p>Conditions: {recipe.conditions}</p>}
                {recipe.allergies && <p>Allergies: {recipe.allergies}</p>}
                {recipe.preferences && <p>Preferences: {recipe.preferences}</p>}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Bookmarks</h1>
        
        <Tabs defaultValue="plants" className="space-y-6">
          <TabsList>
            <TabsTrigger value="plants">Saved Plants</TabsTrigger>
            <TabsTrigger value="recipes">Saved Recipes</TabsTrigger>
          </TabsList>

          <TabsContent value="plants">
            {savedPlants.length === 0 ? (
              <p className="text-muted-foreground">No saved plants yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPlants.map((plant) => (
                  <Card key={plant.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={getPlantImageUrl(plant)}
                        alt={plant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{plant.name}</CardTitle>
                      <p className="text-sm text-muted-foreground italic">
                        {plant.scientificName}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {plant.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemovePlantBookmark(plant.id)}
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        Remove Bookmark
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recipes">
            {savedRecipes.length === 0 ? (
              <p className="text-muted-foreground">No saved recipes yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map((recipe) => (
                  <Card key={recipe._id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{recipe.name}</CardTitle>
                      {recipe.description && (
                        <p className="text-sm text-muted-foreground">{recipe.description}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Ingredients:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                            {recipe.ingredients.length > 3 && (
                              <li className="text-primary">+ {recipe.ingredients.length - 3} more...</li>
                            )}
                          </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedRecipe(recipe)}
                          >
                            View Full Recipe
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveRecipeBookmark(recipe._id!)}
                          >
                            <Bookmark className="h-4 w-4 mr-2" />
                            Remove Bookmark
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <RecipeDialog
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onOpenChange={(open) => !open && setSelectedRecipe(null)}
        />
      </div>
    </div>
  );
} 