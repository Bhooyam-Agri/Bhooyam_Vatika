'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Play, Clock, Calendar, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

// Consolidated Virtual Tours page that replaces both versions
export default function VirtualToursPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Header */}
      <div className="fixed top-16 w-full bg-background/95 backdrop-blur-sm border-b z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Breadcrumb navigation */}
            <nav>
              <ol className="flex items-center space-x-2">
                <li><a href="/vatika" className="hover:text-primary">Vatika</a></li>
                <li>/</li>
                <li>Virtual Tours</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Virtual Garden Tours</h1>
            <p className="text-xl text-muted-foreground">
              Experience guided virtual tours of our medicinal plant gardens and greenhouses.
              Learn about cultivation techniques and traditional uses from our experts.
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* Featured Tours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Adaptogenic Plants Garden",
              description: "Explore our collection of stress-reducing and adaptogenic herbs",
              duration: "45 mins",
              date: "Available Now",
              image: "https://images.unsplash.com/photo-1620127807580-990c3eaec7c9?auto=format&fit=crop&q=80"
            },
            {
              title: "Ayurvedic Herbs Greenhouse",
              description: "Discover traditional Indian medicinal plants and their cultivation",
              duration: "60 mins",
              date: "Next Tour: Tomorrow",
              image: "https://images.unsplash.com/photo-1618912144644-ff503f3add67?auto=format&fit=crop&q=80"
            },
            {
              title: "Hydroponic Medicinal Garden",
              description: "Learn about modern cultivation of healing plants",
              duration: "30 mins",
              date: "On Demand",
              image: "https://images.unsplash.com/photo-1618912123014-99584fb9d149?auto=format&fit=crop&q=80"
            }
          ].map((tour) => (
            <div key={tour.title} className="group relative bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img src={tour.image} alt={tour.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="rounded-full" size="lg">
                    <Play className="h-5 w-5 mr-2" />
                    Start Tour
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-muted-foreground mb-4">{tour.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {tour.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-24">
        {/* Educational Resources */}
        <h2 className="text-2xl font-semibold mb-8 text-center">Educational Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Growing Guides",
              description: "Step-by-step guides for cultivating medicinal plants",
              icon: BookOpen,
              color: "bg-green-100 dark:bg-green-900/20"
            },
            {
              title: "Video Library",
              description: "Watch expert tutorials and cultivation techniques",
              icon: Play,
              color: "bg-blue-100 dark:bg-blue-900/20"
            },
            {
              title: "Seasonal Calendar",
              description: "Learn when to plant and harvest different species",
              icon: Calendar,
              color: "bg-orange-100 dark:bg-orange-900/20"
            }
          ].map((resource) => (
            <div key={resource.title} className="group relative bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", resource.color)}>
                <resource.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
              <p className="text-muted-foreground">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Future Expansion: Interactive Tour Stages & 3D Garden Visualizer */}
    </div>
  );
}