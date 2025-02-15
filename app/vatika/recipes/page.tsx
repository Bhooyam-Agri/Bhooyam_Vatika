'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRecipesStore } from '@/lib/recipes';
import { Search, Timer, Book, Filter } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { recipes, searchRecipes } = useRecipesStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(recipes.map(recipe => recipe.category)));
  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.category === selectedCategory)
    : searchQuery
    ? searchRecipes(searchQuery)
    : recipes;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Medicinal Plant Recipes</h1>
          
          {/* Search Bar */}
          <div className="mb-8">
            <Command className="rounded-lg border">
              <CommandInput
                placeholder="Search recipes by name, plant, or use..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              {searchQuery && (
                <CommandList>
                  {searchRecipes(searchQuery).map((recipe) => (
                    <CommandItem
                      key={recipe.id}
                      onSelect={() => {
                        setSearchQuery('');
                        // Handle recipe selection
                      }}
                    >
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium">{recipe.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {recipe.plant.name} • {recipe.category}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandList>
              )}
            </Command>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All Recipes
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Recipe Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{recipe.name}</CardTitle>
                  <CardDescription>
                    Made with {recipe.plant.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Timer className="h-4 w-4 mr-1" />
                      {recipe.preparationTime}
                    </div>
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-1" />
                      {recipe.category}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {recipe.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Medicinal Uses</h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.medicinalUses.map((use, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 rounded-full text-xs"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}