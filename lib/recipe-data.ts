import { Recipe } from './recipes';
import { Plant } from './plants';

// Sample plants for the recipes
const samplePlants: { [key: string]: Plant } = {
  chamomile: {
    id: 'chamomile',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    description: 'A gentle herb known for its calming and anti-inflammatory properties.',
    uses: ['Sleep Aid', 'Digestive Aid', 'Anti-inflammatory'],
    regions: ['Europe', 'Western Asia'],
    conditions: ['Insomnia', 'Anxiety', 'Digestive Issues']
  },
  echinacea: {
    id: 'echinacea',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    description: 'A powerful immune-boosting herb native to North America.',
    uses: ['Immune Support', 'Cold & Flu Relief', 'Anti-inflammatory'],
    regions: ['North America'],
    conditions: ['Common Cold', 'Flu', 'Low Immunity']
  },
  peppermint: {
    id: 'peppermint',
    name: 'Peppermint',
    scientificName: 'Mentha × piperita',
    description: 'A refreshing herb that aids digestion and relieves nausea.',
    uses: ['Digestive Aid', 'Nausea Relief', 'Headache Relief'],
    regions: ['Europe', 'North America'],
    conditions: ['Digestive Issues', 'Nausea', 'Headaches']
  }
};

export const sampleRecipes: Recipe[] = [
  {
    id: 'calming-tea-blend',
    name: 'Calming Herbal Tea Blend',
    description: 'A soothing blend of calming herbs to help with stress and anxiety.',
    plant: samplePlants.chamomile, // Primary plant for this recipe
    ingredients: [
      '2 parts Chamomile flowers',
      '1 part Lavender buds',
      '1 part Lemon Balm leaves',
      '1/2 part Passionflower',
      'Honey to taste (optional)'
    ],
    instructions: [
      'Combine all dried herbs in a clean jar',
      'Use 1-2 teaspoons of blend per cup of hot water',
      'Steep for 5-10 minutes',
      'Strain and add honey if desired',
      'Drink 1-2 cups daily, especially before bedtime'
    ],
    category: 'Teas',
    preparationTime: '5-10 minutes',
    medicinalUses: ['Stress Relief', 'Sleep Aid', 'Anxiety Relief'],
    benefits: [
      'Promotes relaxation',
      'Helps improve sleep quality',
      'Reduces anxiety and nervous tension',
      'Gentle and safe for regular use'
    ],
    warnings: [
      'Avoid if allergic to any of the ingredients',
      'May cause drowsiness',
      'Consult healthcare provider if pregnant or nursing'
    ],
    plantIds: ['chamomile', 'lavender', 'lemon-balm', 'passionflower']
  },
  {
    id: 'immune-boost-decoction',
    name: 'Immune-Boosting Root Decoction',
    description: 'A powerful blend of immune-supporting roots and herbs.',
    plant: samplePlants.echinacea, // Primary plant for this recipe
    ingredients: [
      '2 parts Astragalus root',
      '1 part Elderberry',
      '1 part Echinacea root',
      '1/2 part Ginger root',
      'Honey to taste (optional)'
    ],
    instructions: [
      'Combine herbs in a pot with 4 cups of water',
      'Bring to a boil, then reduce heat and simmer for 20-30 minutes',
      'Strain and let cool slightly',
      'Add honey if desired',
      'Drink 1 cup 2-3 times daily during cold and flu season'
    ],
    category: 'Decoctions',
    preparationTime: '30-40 minutes',
    medicinalUses: ['Immune Support', 'Cold & Flu Prevention', 'Energy Boost'],
    benefits: [
      'Strengthens immune system',
      'Helps prevent colds and flu',
      'Provides natural energy',
      'Rich in antioxidants'
    ],
    warnings: [
      'Not recommended for autoimmune conditions without professional guidance',
      'May interact with some medications',
      'Reduce dosage if experiencing digestive upset'
    ],
    plantIds: ['astragalus', 'elderberry', 'echinacea', 'ginger']
  },
  {
    id: 'digestive-support-tea',
    name: 'Digestive Support Tea',
    description: 'A warming blend of carminative herbs to support healthy digestion.',
    plant: samplePlants.peppermint, // Primary plant for this recipe
    ingredients: [
      '2 parts Peppermint leaves',
      '1 part Fennel seeds',
      '1 part Ginger root',
      '1/2 part Licorice root',
      'Honey to taste (optional)'
    ],
    instructions: [
      'Mix all herbs together in a clean container',
      'Use 1 teaspoon of blend per cup of hot water',
      'Steep for 10-15 minutes',
      'Strain and add honey if desired',
      'Drink after meals or as needed for digestive support'
    ],
    category: 'Teas',
    preparationTime: '15-20 minutes',
    medicinalUses: ['Digestive Aid', 'Gas Relief', 'Nausea Relief'],
    benefits: [
      'Soothes digestive discomfort',
      'Reduces bloating and gas',
      'Helps with nausea',
      'Improves overall digestion'
    ],
    warnings: [
      'Avoid licorice root if you have high blood pressure',
      'Not recommended during pregnancy without professional guidance',
      'May interact with some medications'
    ],
    plantIds: ['peppermint', 'fennel', 'ginger', 'licorice']
  }
]; 