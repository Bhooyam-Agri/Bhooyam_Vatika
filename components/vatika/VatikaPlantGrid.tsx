import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck, ExternalLink, Info } from 'lucide-react';
import { usePlantsStore } from '@/lib/plants';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getPlantImageUrl } from '@/lib/image-utils';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function VatikaPlantGrid() {
  const { plants, bookmarkedPlants, addBookmark, removeBookmark } = usePlantsStore();
  const router = useRouter();

  const handleBookmark = (e: React.MouseEvent, plantId: string) => {
    e.stopPropagation();
    if (bookmarkedPlants.includes(plantId)) {
      removeBookmark(plantId);
    } else {
      addBookmark(plantId);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Medicinal Plants</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of medicinal plants, each with detailed information about their properties and uses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.map((plant) => (
            <motion.div key={plant.id} variants={item}>
              <Card 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer
                         border border-transparent hover:border-primary/20 overflow-hidden"
                onClick={() => router.push(`/plant-library/${plant.id}`)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getPlantImageUrl(plant)}
                    alt={plant.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-2 right-2 flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/90 hover:bg-white shadow-lg"
                            onClick={(e) => handleBookmark(e, plant.id)}
                          >
                            {bookmarkedPlants.includes(plant.id) ? (
                              <BookmarkCheck className="h-5 w-5 text-primary" />
                            ) : (
                              <Bookmark className="h-5 w-5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{bookmarkedPlants.includes(plant.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/90 hover:bg-white shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/plant-library/${plant.id}`, '_blank');
                            }}
                          >
                            <ExternalLink className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open in new tab</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {plant.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground italic">
                    {plant.scientificName}
                  </p>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 group-hover:text-foreground transition-colors">
                    {plant.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {plant.uses.slice(0, 3).map((use, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 rounded-full text-xs
                                 group-hover:bg-primary/20 transition-colors"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary/10 transition-colors"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 