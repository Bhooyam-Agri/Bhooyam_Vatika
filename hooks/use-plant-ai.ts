import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Plant } from '@/lib/plants';

interface PlantAIProps {
  plantName?: string;
  scientificName?: string;
}

interface UsePlantAIReturn {
  loading: boolean;
  error: string | null;
  answer: string | null;
  askQuestion: (question: string, plant?: Plant) => Promise<void>;
  getInsights: (plant?: Plant) => Promise<void>;
  askAboutPlant: (plant: Plant, query: string) => Promise<string>;
}

export function usePlantAI(props?: PlantAIProps): UsePlantAIReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const makeRequest = async (
    question?: string, 
    type: 'qa' | 'insights' = 'qa',
    plantName?: string,
    scientificName?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      if (!plantName || !scientificName) {
        throw new Error('Plant name and scientific name are required');
      }

      console.log('Making request with:', { plantName, scientificName, question, type });

      const response = await fetch('/api/plant-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plantName,
          scientificName,
          question,
          type: type === 'insights' ? 'insights' : undefined,
        }),
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        const errorMessage = data.error || data.details || 'Failed to get response';
        throw new Error(errorMessage);
      }

      if (!data.data && data.data !== '') {
        throw new Error('Invalid response format');
      }

      setAnswer(data.data);
      return data.data;
    } catch (err: any) {
      console.error('Plant AI Request Error:', err);
      const errorMessage = err.message || 'Failed to get AI response';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return '';
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (question: string, plant?: Plant) => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive"
      });
      return;
    }
    await makeRequest(
      question, 
      'qa',
      plant?.name || props?.plantName,
      plant?.scientificName || props?.scientificName
    );
  };

  const getInsights = async (plant?: Plant) => {
    await makeRequest(
      undefined, 
      'insights',
      plant?.name || props?.plantName,
      plant?.scientificName || props?.scientificName
    );
  };

  // Maintain backward compatibility
  const askAboutPlant = async (plant: Plant, query: string): Promise<string> => {
    try {
      const result = await makeRequest(query, 'qa', plant.name, plant.scientificName);
      return result || '';
    } catch (err) {
      return '';
    }
  };

  return {
    loading,
    error,
    answer,
    askQuestion,
    getInsights,
    askAboutPlant,
  };
}