import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTreflePlantByScientificName } from './trefle-api';

// Import local plants data
const localPlants = require('../data/plants.json').plants;

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  uses: string[];
  regions: string[];
  conditions: string[];
  category?: string[];
}

interface PlantsStore {
  plants: Plant[];
  bookmarkedPlants: string[];
  dailyPlant: Plant | null;
  lastRotated: string;
  searchPlants: (query: string) => Plant[];
  filterByCategory: (category: string) => Plant[];
  addBookmark: (plantId: string) => void;
  removeBookmark: (plantId: string) => void;
  setDailyPlant: (plant: Plant) => void;
  rotateDailyPlant: () => void;
  initialize: () => Promise<void>;
  initializePlants: () => Promise<void>;
}

export const usePlantsStore = create<PlantsStore>()(
  persist(
    (set, get) => ({
      plants: [],
      bookmarkedPlants: [],
      dailyPlant: null,
      lastRotated: new Date().toDateString(),
      searchPlants: (query: string) => {
        const state = get();
        const searchTerm = query.toLowerCase().trim();
        if (!searchTerm) return [];
        
        return state.plants.filter(plant => 
          plant.name.toLowerCase().includes(searchTerm) ||
          plant.scientificName.toLowerCase().includes(searchTerm) ||
          plant.conditions.some(c => c.toLowerCase().includes(searchTerm)) ||
          plant.uses.some(u => u.toLowerCase().includes(searchTerm))
        );
      },
      filterByCategory: (category: string) => {
        const state = get();
        return state.plants.filter(plant => 
          plant.category?.includes(category)
        );
      },
      addBookmark: (plantId: string) => {
        set(state => ({
          bookmarkedPlants: [...state.bookmarkedPlants, plantId]
        }));
      },
      removeBookmark: (plantId: string) => {
        set(state => ({
          bookmarkedPlants: state.bookmarkedPlants.filter(id => id !== plantId)
        }));
      },
      setDailyPlant: (plant: Plant) => {
        set({ dailyPlant: plant });
      },
      rotateDailyPlant: () => {
        const state = get();
        const today = new Date().toDateString();
        
        if (state.lastRotated !== today && state.plants.length > 0) {
          const currentIndex = state.dailyPlant ? state.plants.findIndex(p => p.id === state.dailyPlant.id) : -1;
          const nextIndex = (currentIndex + 1) % state.plants.length;
          set({ 
            dailyPlant: state.plants[nextIndex],
            lastRotated: today
          });
        }
      },
      initialize: async () => {
        try {
          console.log('Initializing plants store...');
          // Load plants from local data first
          const localData = require('../data/plants.json');
          set({ plants: localData.plants });

          // Then try to fetch from API
          const response = await fetch('/api/plants');
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              set({ plants: data });
            }
          }

          // Initialize daily plant if needed
          const state = get();
          const today = new Date().toDateString();
          
          if (state.lastRotated !== today || !state.dailyPlant) {
            const randomIndex = Math.floor(Math.random() * state.plants.length);
            set({
              dailyPlant: state.plants[randomIndex],
              lastRotated: today
            });
          }
        } catch (error) {
          console.error('Failed to initialize plants:', error);
          // Don't throw error, use local data as fallback
        }
      },
      initializePlants: async () => {
        await get().initialize();
      },
    }),
    {
      name: 'vatika-plants-storage',
      partialize: (state) => ({
        bookmarkedPlants: state.bookmarkedPlants,
        lastRotated: state.lastRotated,
        dailyPlant: state.dailyPlant
      })
    }
  )
);