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
          // Fetch plants from API instead of direct MongoDB connection
          const response = await fetch('/api/plants');
          if (!response.ok) {
            throw new Error(`Failed to fetch plants: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          
          // Check if we received an error response
          if (data.error) {
            throw new Error(`API Error: ${data.error} - ${data.details || ''}`);
          }
          
          console.log(`Loaded ${data.length} plants from API`);;
          
          // If no plants are returned, throw an error
          if (!Array.isArray(data) || data.length === 0) {
            throw new Error('No plants found in the database. Please ensure the database is populated with plant data.');
          }
          
          set({ plants: data });

          // Initialize daily plant if needed
          const state = get();
          const today = new Date().toDateString();
          
          console.log('Checking daily plant rotation...', {
            lastRotated: state.lastRotated,
            today,
            currentDailyPlant: state.dailyPlant
          });
          
          if (state.lastRotated !== today || !state.dailyPlant) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const newDailyPlant = data[randomIndex];
            console.log('Setting new daily plant:', newDailyPlant.name);
            set({
              dailyPlant: newDailyPlant,
              lastRotated: today
            });
          }
        } catch (error) {
          console.error('Failed to initialize plants:', error);
          // Re-throw the error to handle it in the component
          throw error;
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