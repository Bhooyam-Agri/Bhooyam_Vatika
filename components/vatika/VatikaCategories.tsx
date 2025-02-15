import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Flower, Sprout, Heart, Brain, Moon, Sun, Shield, Droplet, Wind, Star, Zap } from 'lucide-react';
import { usePlantsStore } from '@/lib/plants';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Adaptogenic Herbs',
    icon: Shield,
    description: 'Herbs that help the body adapt to stress',
    color: 'from-amber-500/20 to-orange-500/20'
  },
  {
    name: 'Calming Herbs',
    icon: Moon,
    description: 'Natural remedies for relaxation and sleep',
    color: 'from-indigo-500/20 to-blue-500/20'
  },
  {
    name: 'Heart Health',
    icon: Heart,
    description: 'Plants supporting cardiovascular health',
    color: 'from-rose-500/20 to-pink-500/20'
  },
  {
    name: 'Brain Boosters',
    icon: Brain,
    description: 'Herbs for cognitive function and memory',
    color: 'from-purple-500/20 to-violet-500/20'
  },
  {
    name: 'Immune Support',
    icon: Shield,
    description: 'Plants that strengthen immune system',
    color: 'from-emerald-500/20 to-green-500/20'
  },
  {
    name: 'Aromatic Herbs',
    icon: Wind,
    description: 'Fragrant herbs with therapeutic properties',
    color: 'from-cyan-500/20 to-teal-500/20'
  },
  {
    name: 'Energy Herbs',
    icon: Zap,
    description: 'Natural energy and vitality boosters',
    color: 'from-yellow-500/20 to-amber-500/20'
  },
  {
    name: 'Digestive Health',
    icon: Droplet,
    description: 'Herbs for digestive wellness',
    color: 'from-lime-500/20 to-green-500/20'
  },
  {
    name: 'Antioxidant Rich',
    icon: Star,
    description: 'Powerful antioxidant herbs',
    color: 'from-fuchsia-500/20 to-purple-500/20'
  }
];

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

export function VatikaCategories() {
  const { filterByCategory } = usePlantsStore();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated categories of medicinal plants, each selected for their unique healing properties and traditional uses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div key={category.name} variants={item}>
              <Card 
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden
                         border border-transparent hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color}
                                  group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-primary/10 transition-colors"
                        onClick={() => filterByCategory(category.name)}
                      >
                        View Plants
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 