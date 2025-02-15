import { Plant } from './plants';
import { EnrichedPlant } from './trefle-api';

// Track which images have been preloaded
const preloadedImages = new Set<string>();

export function getPlantImageUrl(plant: Plant | EnrichedPlant): string {
  // If the plant already has an imageUrl, use it
  if ('imageUrl' in plant && plant.imageUrl) {
    return plant.imageUrl;
  }

  // Use a default placeholder image
  return '/images/plant-placeholder.jpg';
}

export async function preloadAllPlantImages(plants: (Plant | EnrichedPlant)[]): Promise<void> {
  // Skip if no plants or if already preloaded
  if (!plants.length) return;

  // Preload images that haven't been preloaded yet
  for (const plant of plants) {
    const imageUrl = getPlantImageUrl(plant);
    if (!preloadedImages.has(imageUrl)) {
      const img = new Image();
      img.src = imageUrl;
      preloadedImages.add(imageUrl);
    }
  }
}

export const getImageUrl = (path: string) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? path : `/images/plants/${path}`;
};

export const normalizePlantData = (plant: any) => {
  const { image, ...rest } = plant;
  return rest;
};