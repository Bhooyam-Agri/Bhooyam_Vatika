import { Button } from '@/components/ui/button';
import { RecipeQuestionnaire } from '@/components/recipe-questionnaire';
import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { motion } from 'framer-motion';
import { Leaf, Sprout, Heart, Search, BookOpen, Flask } from 'lucide-react';

export function VatikaHero() {
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);

  const features = [
    { icon: Leaf, text: "Discover Medicinal Plants" },
    { icon: Heart, text: "Natural Healing" },
    { icon: Search, text: "Research-Based Information" },
    { icon: Flask, text: "Traditional Remedies" },
    { icon: Sprout, text: "Sustainable Practices" },
    { icon: BookOpen, text: "Educational Resources" },
  ];

  return (
    <div className="relative">
      <Navigation />
      <div className="relative min-h-[90vh] overflow-hidden bg-[url('/images/herbs-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-900/95 to-sage-800/95 backdrop-blur-sm" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Discover the Healing Power</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-sage-400 to-emerald-400">
                of Medicinal Plants
              </span>
            </h1>
            
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
              Explore our curated collection of medicinal plants, learn about their traditional uses,
              and discover personalized herbal remedies for your well-being.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setRecipeDialogOpen(true)}
                  className="w-full sm:w-auto px-8 py-3 text-lg font-medium rounded-full 
                           bg-gradient-to-r from-sage-500 to-emerald-500 hover:from-sage-600 hover:to-emerald-600
                           text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Personalized Recipes
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-3 text-lg font-medium rounded-full
                           border-2 border-sage-400 text-sage-400 hover:bg-sage-400/10
                           transition-all duration-200"
                >
                  Browse Plant Library
                </Button>
              </motion.div>
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-sage-400/20 flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-sage-400" />
                  </div>
                  <span className="text-sm text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <RecipeQuestionnaire
        open={recipeDialogOpen}
        onOpenChange={setRecipeDialogOpen}
      />
    </div>
  );
} 