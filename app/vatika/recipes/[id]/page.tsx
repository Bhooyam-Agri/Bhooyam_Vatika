'use client';

import { useParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useRecipesStore } from '@/lib/recipes';
import { Timer, Book, ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function RecipeDetailPage() {
  const params = useParams();
  const { recipes } = useRecipesStore();
  
  const recipe = recipes.find(r => r.id === params.id);

  if (!recipe) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
            <Link href="/vatika/recipes">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Recipes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/vatika">Vatika</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/vatika/recipes">Recipes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{recipe.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Recipe Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">{recipe.name}</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print Recipe
              </Button>
            </div>
          </div>

          {/* Recipe Info */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center">
                  <Timer className="h-5 w-5 mr-2" />
                  {recipe.preparationTime}
                </div>
                <div className="flex items-center">
                  <Book className="h-5 w-5 mr-2" />
                  {recipe.category}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipe Content */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{recipe.description}</p>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-4">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="text-muted-foreground">
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              {/* Ingredients */}
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Medicinal Uses */}
              <Card>
                <CardHeader>
                  <CardTitle>Medicinal Uses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {recipe.medicinalUses.map((use, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Plant Info */}
              <Card>
                <CardHeader>
                  <CardTitle>About {recipe.plant.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    {recipe.plant.scientificName}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {recipe.plant.description}
                  </p>
                  <Link href={`/plant-library/${recipe.plant.id}`}>
                    <Button variant="outline" className="w-full">
                      Learn More About This Plant
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}