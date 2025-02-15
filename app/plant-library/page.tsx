'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { SearchInput } from '@/components/ui/search-input';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function PlantLibraryPage() {
  return (
    <div className="min-h-screen gradient-page gradient-dark">
      <Navigation />
      
      {/* Plant Library Header */}
      <div className="fixed top-16 w-full bg-background/95 backdrop-blur-sm border-b z-40">
        <div className="container mx-auto px-4">
          {/* Search and Navigation */}
          <div className="flex items-center justify-between h-16">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-lg font-semibold" href="/vatika">
                    Vatika
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/plant-library/browse">
                    Browse Plants
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/plant-library/virtual-tours">
                    Virtual Tours
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/plant-library/about">
                    About Medicinal Plants
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="w-72">
              <SearchInput placeholder="Search plants..." />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl font-bold mb-6">Vatika</h1>
        {/* Add your plant library content here */}
      </div>

      {/* Hero Section */}
      <div className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover the World of Medicinal Plants
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our comprehensive library of medicinal plants, learn about their properties,
              and discover how they can contribute to natural wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full">
                Browse Plants
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Take a Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Adaptogenic Plants',
                description: 'Plants that help the body adapt to stress and maintain balance',
                image: 'https://images.unsplash.com/photo-1618912123014-99584fb9d149?auto=format&fit=crop&q=80'
              },
              {
                title: 'Immune Support',
                description: 'Plants known for their immune-boosting properties',
                image: 'https://images.unsplash.com/photo-1620127807580-990c3eaec7c9?auto=format&fit=crop&q=80'
              },
              {
                title: 'Digestive Health',
                description: 'Plants that support digestive system wellness',
                image: 'https://images.unsplash.com/photo-1618912144644-ff503f3add67?auto=format&fit=crop&q=80'
              }
            ].map((category) => (
              <div 
                key={category.title}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-white/90 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Placeholder: 
        - Stage 1: Basic Herb Database
        - Stage 2: User Accounts & My Garden 
        - Stage 3: Interactive Virtual Tours
        - Stage 4: Community Forum
      */}
    </div>
  );
}