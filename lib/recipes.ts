import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Plant } from './plants';
import { sampleRecipes } from './recipe-data';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  plant: Plant;
  ingredients: string[];
  instructions: string[];
  category: string;
  preparationTime: string;
  medicinalUses: string[];
  benefits: string[];
  warnings?: string[];
  plantIds: string[];
}

interface RecipesStore {
  recipes: Recipe[];
  favoriteRecipes: string[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (recipeId: string) => void;
  toggleFavorite: (recipeId: string) => void;
  getRecipesByPlant: (plantId: string) => Recipe[];
  searchRecipes: (query: string) => Recipe[];
  initialize: () => void;
}

export const useRecipesStore = create<RecipesStore>()(
  persist(
    (set, get) => ({
      recipes: [],
      favoriteRecipes: [],

      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [...state.recipes, recipe]
        })),

      removeRecipe: (recipeId) =>
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
          favoriteRecipes: state.favoriteRecipes.filter((id) => id !== recipeId)
        })),

      toggleFavorite: (recipeId) =>
        set((state) => ({
          favoriteRecipes: state.favoriteRecipes.includes(recipeId)
            ? state.favoriteRecipes.filter((id) => id !== recipeId)
            : [...state.favoriteRecipes, recipeId]
        })),

      getRecipesByPlant: (plantId: string) => {
        const state = get();
        return state.recipes.filter((recipe) => recipe.plantIds.includes(plantId));
      },

      searchRecipes: (query) => {
        const state = get();
        const searchTerm = query.toLowerCase();
        return state.recipes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchTerm) ||
          recipe.description.toLowerCase().includes(searchTerm) ||
          recipe.medicinalUses.some(use => use.toLowerCase().includes(searchTerm)) ||
          recipe.plant.name.toLowerCase().includes(searchTerm)
        );
      },

      initialize: () => {
        set({ recipes: sampleRecipes });
      }
    }),
    {
      name: 'vatika-recipes-storage',
      partialize: (state) => ({
        recipes: state.recipes,
        favoriteRecipes: state.favoriteRecipes
      })
    }
  )
);