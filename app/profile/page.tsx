'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Loader2, User, Mail, Settings, History } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Plant } from '@/lib/plants';
import Image from 'next/image';
import { getPlantImageUrl } from '@/lib/image-utils';
import { useCallback } from 'react';

interface Recipe {
  _id?: string;
  userId: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  warnings?: string[];
  isBookmarked?: boolean;
  symptoms?: string;
  conditions?: string;
  allergies?: string;
  preferences?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ProfilePage() {
  const [savedPlants, setSavedPlants] = useState<Plant[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchBookmarks = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Fetch saved plants
      const plantsResponse = await fetch(`/api/plants/bookmarks?userId=${user.uid}`);
      if (!plantsResponse.ok) {
        throw new Error('Failed to fetch saved plants');
      }
      const plantsData = await plantsResponse.json();
      setSavedPlants(plantsData);

      // Fetch saved recipes
      const recipesResponse = await fetch(`/api/recipes?userId=${user.uid}`);
      if (!recipesResponse.ok) {
        throw new Error('Failed to fetch saved recipes');
      }
      const recipesData = await recipesResponse.json();
      setSavedRecipes(recipesData.filter((recipe: Recipe) => recipe.isBookmarked));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch bookmarks",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (!mounted) return;

    // Only redirect if auth is not loading and user is not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
      return;
    }

    // Only fetch data if user is authenticated
    if (isAuthenticated && user) {
      fetchBookmarks();
    }
  }, [mounted, user, isAuthenticated, authLoading, router, fetchBookmarks]);

  const handleRemovePlantBookmark = async (plantId: string) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/plants/bookmarks/${plantId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid })
      });

      if (!response.ok) {
        throw new Error('Failed to remove plant bookmark');
      }

      setSavedPlants(plants => plants.filter(p => p.id !== plantId));
      toast({
        title: "Success",
        description: "Plant removed from bookmarks"
      });
    } catch (error) {
      console.error('Error removing plant bookmark:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove bookmark",
        variant: "destructive"
      });
    }
  };

  const handleRemoveRecipeBookmark = async (recipeId: string) => {
    if (!user) return;

    try {
      const response = await fetch('/api/recipes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeId,
          isBookmarked: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to remove recipe bookmark');
      }

      setSavedRecipes(recipes => recipes.filter(r => r._id !== recipeId));
      toast({
        title: "Success",
        description: "Recipe removed from bookmarks"
      });
    } catch (error) {
      console.error('Error removing recipe bookmark:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove bookmark",
        variant: "destructive"
      });
    }
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  // Show loading state while checking authentication
  if (authLoading || loading) {
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

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl">Profile</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {user?.email}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="bookmarks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="bookmarks">
              <div className="grid gap-6">
                {/* Saved Plants */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Saved Plants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {savedPlants.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bookmark className="h-8 w-8 mx-auto mb-2" />
                        <p>No saved plants yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                              <CardTitle className="text-lg">{plant.name}</CardTitle>
                              <p className="text-sm text-muted-foreground italic">
                                {plant.scientificName}
                              </p>
                            </CardHeader>
                            <CardContent>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemovePlantBookmark(plant.id)}
                                className="w-full"
                              >
                                <Bookmark className="h-4 w-4 mr-2" />
                                Remove Bookmark
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Saved Recipes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Saved Recipes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {savedRecipes.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bookmark className="h-8 w-8 mx-auto mb-2" />
                        <p>No saved recipes yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedRecipes.map((recipe) => (
                          <Card key={recipe._id} className="overflow-hidden">
                            <CardHeader>
                              <CardTitle className="text-lg">{recipe.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Ingredients:</h4>
                                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    {recipe.ingredients.slice(0, 3).map((ingredient: string, index: number) => (
                                      <li key={index}>{ingredient}</li>
                                    ))}
                                  </ul>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveRecipeBookmark(recipe._id!)}
                                  className="w-full"
                                >
                                  <Bookmark className="h-4 w-4 mr-2" />
                                  Remove Bookmark
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-8 w-8 mx-auto mb-2" />
                    <p>Activity history coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 