'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { WeatherWidget } from '@/components/weather-widget';
import { EcoImpact } from '@/components/eco-impact';
import { FeatureCard } from '@/components/ui/feature-card';
import { HeroSection } from '@/components/ui/HeroSection';
import { ClientOnly } from '@/components/ui/client-only';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlantsStore } from '@/lib/plants';
import { getPlantImageUrl } from '@/lib/image-utils';
import { Bookmark, BookmarkCheck, Leaf, Globe2, Pill, AlertTriangle } from 'lucide-react';
import styles from '@/styles/grid-pattern.module.css';
import { VatikaPlantGrid } from '@/components/vatika/VatikaPlantGrid';

interface PlantInsights {
  traditionalUses: string;
  modernResearch: string;
  safetyConsiderations: string;
}

export default function HomePage() {
  const [showDetails, setShowDetails] = useState(false);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insights, setInsights] = useState<PlantInsights | null>(null);
  const { dailyPlant, bookmarkedPlants, addBookmark, removeBookmark, plants } = usePlantsStore();

  const fetchPlantInsights = async (plant: any) => {
    setIsLoadingInsights(true);
    try {
      const response = await fetch('/api/plant-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: plant.name,
          scientificName: plant.scientificName,
          description: plant.description,
          uses: plant.uses,
          conditions: plant.conditions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch plant insights');
      }

      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error('Error fetching plant insights:', error);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleLearnMore = (plant: any) => {
    setShowDetails(true);
    fetchPlantInsights(plant);
  };

  const handleBookmark = (plantId: string) => {
    if (bookmarkedPlants.includes(plantId)) {
      removeBookmark(plantId);
    } else {
      addBookmark(plantId);
    }
  };

  return (
    <div className="min-h-screen gradient-page gradient-dark overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Medicinal Plant Section */}
      <section className="py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Medicinal Plant
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover the healing power of nature with our daily featured plant
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ClientOnly>
              {dailyPlant && (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Plant of the Day</CardTitle>
                          <CardDescription>Explore the therapeutic properties and traditional uses</CardDescription>
                        </div>
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
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                      <div className="h-64 relative">
                        <Image 
                          src={getPlantImageUrl(dailyPlant)} 
                          alt={dailyPlant.name}
                          fill
                          className="object-cover rounded-lg"
                          priority
                        />
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
                          onClick={() => handleLearnMore(dailyPlant)}
                        >
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Dialog open={showDetails} onOpenChange={setShowDetails}>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{dailyPlant.name}</DialogTitle>
                        <DialogDescription className="italic">{dailyPlant.scientificName}</DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="overview" className="mt-6">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="uses">Uses</TabsTrigger>
                          <TabsTrigger value="regions">Regions</TabsTrigger>
                          <TabsTrigger value="research">Research</TabsTrigger>
                          <TabsTrigger value="safety">Safety</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4 mt-4">
                          <div className="aspect-video relative rounded-lg overflow-hidden">
                            <Image 
                              src={getPlantImageUrl(dailyPlant)} 
                              alt={dailyPlant.name}
                              fill
                              className="object-cover"
                              priority
                            />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Description</h4>
                            <p className="text-muted-foreground">{dailyPlant.description}</p>
                          </div>
                          {dailyPlant.category && (
                            <div>
                              <h4 className="text-lg font-semibold mb-2">Categories</h4>
                              <div className="flex flex-wrap gap-2">
                                {dailyPlant.category.map((cat) => (
                                  <span key={cat} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="uses" className="space-y-4 mt-4">
                          <div>
                            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                              <Leaf className="h-5 w-5" />
                              Therapeutic Uses
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {dailyPlant.uses.map((use, index) => (
                                <span key={index} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-muted-foreground">
                              These therapeutic applications have been documented through traditional use and modern research, showcasing the plant&apos;s versatile healing properties.
                            </p>
                          </div>
                          <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                              <Pill className="h-5 w-5" />
                              Treated Conditions
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {dailyPlant.conditions.map((condition, index) => (
                                <span key={index} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-muted-foreground">
                              This plant has been traditionally used to address these specific health conditions. The effectiveness may vary, and modern research continues to validate these traditional applications.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="regions" className="space-y-4 mt-4">
                          <div>
                            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                              <Globe2 className="h-5 w-5" />
                              Native Regions
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {dailyPlant.regions.map((region, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
                                  {region}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-muted-foreground">
                              This plant is traditionally found and cultivated in these regions, where it has been used in traditional medicine practices for generations.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="research" className="space-y-4 mt-4">
                          {isLoadingInsights ? (
                            <div className="flex items-center justify-center p-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                          ) : insights ? (
                            <>
                              <div>
                                <h4 className="text-lg font-semibold mb-2">Traditional Uses</h4>
                                <p className="text-muted-foreground">{insights.traditionalUses}</p>
                              </div>
                              <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-2">Modern Research</h4>
                                <p className="text-muted-foreground">{insights.modernResearch}</p>
                              </div>
                            </>
                          ) : (
                            <p className="text-muted-foreground text-center py-8">
                              Failed to load research insights. Please try again later.
                            </p>
                          )}
                        </TabsContent>

                        <TabsContent value="safety" className="space-y-4 mt-4">
                          <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 mb-2">
                              <AlertTriangle className="h-5 w-5" />
                              <h4 className="text-lg font-semibold">Safety Considerations</h4>
                            </div>
                            {isLoadingInsights ? (
                              <div className="flex items-center justify-center p-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-800 dark:border-yellow-200"></div>
                              </div>
                            ) : insights ? (
                              <p className="text-yellow-800/80 dark:text-yellow-200/80">
                                {insights.safetyConsiderations}
                              </p>
                            ) : (
                              <p className="text-yellow-800/80 dark:text-yellow-200/80">
                                Always consult with a qualified healthcare practitioner before using any medicinal plants. 
                                Some plants may interact with medications or have contraindications for certain conditions.
                              </p>
                            )}
                          </div>
                          <div className="mt-4">
                            <h4 className="text-lg font-semibold mb-2">Recommended Usage</h4>
                            <p className="text-muted-foreground">
                              Traditional preparation methods and dosage vary by region and practice. 
                              Modern research continues to investigate the optimal ways to utilize this plant's therapeutic properties.
                              Always follow proper guidelines and consult with healthcare professionals for specific usage instructions.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Weather & Impact Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ClientOnly>
              <WeatherWidget />
            </ClientOnly>
            <ClientOnly>
              <EcoImpact showTotal={true} />
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the perfect blend of technology and nature
            </p>
          </div>
          <ClientOnly>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="AI-Powered Growth"
                description="Advanced algorithms optimize growing conditions in real-time for maximum yield"
                index={0}
              />
              <FeatureCard 
                title="Sustainable Solutions"
                description="90% less water usage compared to traditional farming methods"
                index={1}
              />
              <FeatureCard 
                title="Smart Monitoring"
                description="24/7 automated monitoring and alerts for peace of mind"
                index={2}
              />
            </div>
          </ClientOnly>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              All Medicinal Plants
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore our extensive collection of medicinal plants
            </p>
          </div>
          <ClientOnly>
            <VatikaPlantGrid plants={plants} />
          </ClientOnly>
        </div>
      </section>
    </div>
  );
}