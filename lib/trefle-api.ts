import { Plant } from './plants';

// Import environment variables
const TREFLE_API_URL = 'https://trefle.io/api/v1';
const TREFLE_API_KEY = process.env.TREFLE_API_KEY;

// Interface for Trefle API plant data
export interface TreflePlantData {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string;
  genus: string;
  year: number;
  bibliography: string;
  author: string;
  status: string;
  rank: string;
  observations: string;
  vegetable: boolean;
  distributions?: {
    native?: string[];
    introduced?: string[];
    doubtful?: string[];
  };
  growth?: {
    precipitation_minimum?: number;
    precipitation_maximum?: number;
    temperature_minimum?: number;
    temperature_maximum?: number;
    soil_texture?: string;
    soil_humidity?: string;
    light?: string;
    atmospheric_humidity?: string;
  };
  links: {
    self: string;
    plant: string;
    genus: string;
  };
}

// Update the Plant interface to include the new properties
export interface EnrichedPlant extends Plant {
  trefleId?: number;
  family?: string;
  genus?: string;
  year?: number;
  bibliography?: string;
  author?: string;
}

// Function to enrich plant data with Trefle data
export async function enrichPlantData(plantData: Plant): Promise<EnrichedPlant> {
  // Return the plant data as is without enrichment
  return plantData;
}