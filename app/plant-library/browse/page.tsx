'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { SearchInput } from '@/components/ui/search-input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from '@/lib/utils';

export default function BrowsePlantsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Sticky Header */}
      <div className="fixed top-16 w-full bg-background/95 backdrop-blur-sm border-b z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters {isFilterOpen ? 'Hide' : 'Show'}
            </Button>
            
            <div className="w-72">
              <SearchInput placeholder="Search plants..." />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-32 container mx-auto px-4">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className={cn(
            "w-64 flex-shrink-0 transition-all duration-300 ease-in-out",
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="sticky top-32 bg-card rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="h-[calc(100vh-12rem)]">
                {/* Plant Categories */}
                <div className="space-y-4">
                  <h4 className="font-medium">Categories</h4>
                  {['Adaptogenic', 'Immune Support', 'Digestive Health', 'Respiratory', 'Cardiovascular', 'Nervous System'].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <label
                        htmlFor={category}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Growing Conditions */}
                <div className="space-y-4">
                  <h4 className="font-medium">Growing Conditions</h4>
                  {['Indoor', 'Outdoor', 'Greenhouse', 'Hydroponic'].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox id={condition} />
                      <label
                        htmlFor={condition}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Difficulty Level */}
                <div className="space-y-4">
                  <h4 className="font-medium">Difficulty Level</h4>
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox id={level} />
                      <label
                        htmlFor={level}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Plant Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i}
                  className="group relative bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${1618912123014 + i}-99584fb9d149?auto=format&fit=crop&q=80`}
                      alt="Plant"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Medicinal Plant {i + 1}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Scientific Name</p>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Adaptogenic
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Indoor
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}