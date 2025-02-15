export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  warnings?: string[];
  category?: string;
  preparationTime?: string;
  medicinalUses?: string[];
  plantIds?: string[];
}

export interface PlantDetails {
  traditionalUses: string[];
  scientificResearch: string[];
  preparation: {
    methods: string[];
    dosage: string;
    precautions: string[];
  };
  interactions: string[];
  historicalUse: string;
  modernApplications: string[];
}
