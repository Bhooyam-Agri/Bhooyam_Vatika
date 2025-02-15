import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PlantAIResponse {
  data?: string;
  error?: string;
  details?: string;
}

interface PlantAIRequest {
  plantName: string;
  scientificName: string;
  question: string;
}

interface ConditionAIRequest {
  question: string;
  context: {
    condition: string;
    plants: {
      name: string;
      scientificName: string;
      uses: string[];
      conditions: string[];
    }[];
  };
}

export function usePlantAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const { toast } = useToast();

  const makeRequest = async (requestData: PlantAIRequest | ConditionAIRequest) => {
    try {
      const response = await fetch('/api/plant-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI response');
      }

      const data: PlantAIResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error: any) {
      console.error('Plant AI Request Error:', error);
      throw new Error(error.message || 'Failed to process request');
    }
  };

  const askAboutPlant = async (plantName: string, scientificName: string, question: string) => {
    setIsLoading(true);
    try {
      const data = await makeRequest({
        plantName,
        scientificName,
        question
      });

      if (data) {
        setResponse(data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const askAboutCondition = async (
    condition: string,
    plants: { name: string; scientificName: string; uses: string[]; conditions: string[] }[],
    question: string
  ) => {
    setIsLoading(true);
    try {
      const data = await makeRequest({
        question,
        context: {
          condition,
          plants
        }
      });

      if (data) {
        setResponse(data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    response,
    askAboutPlant,
    askAboutCondition
  };
}