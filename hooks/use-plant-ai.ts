import { useState } from 'react';
import { Plant } from '@/lib/plants';

interface UsePlantAIReturn {
  loading: boolean;
  error: string | null;
  askAboutPlant: (plant: Plant, query: string) => Promise<string>;
}

export function usePlantAI(): UsePlantAIReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAboutPlant = async (plant: Plant, query: string): Promise<string> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/plant-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plantName: plant.name,
          scientificName: plant.scientificName,
          question: query
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return '';
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    askAboutPlant,
  };
}