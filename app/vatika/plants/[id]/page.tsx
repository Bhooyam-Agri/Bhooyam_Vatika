'use client';

import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlantsStore } from '@/lib/plants';
import { useRecipesStore } from '@/lib/recipes';
import { ChevronLeft, Bookmark, BookmarkCheck, Book, Star } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function PlantDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { plants, bookmarkedPlants, addBookmark, removeBookmark } = usePlantsStore();
  const { getPlantRecipes } = useRecipesStore();
  
  const plant = plants.find(p => p.id === params.id);
  const recipes = plant ? getPlantRecipes(plant.id) : [];

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

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/vatika">Vatika</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/vatika/browse">Browse Plants</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{plant.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
                  } else {
                    addBookmark(plant.id);
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
                  {plant.uses.map(use => (
                    <span key={use} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Treats Conditions</h3>
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
      </div>
    </div>
  );
}