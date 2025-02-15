import { Plant } from '@/models/Plant';

export interface MedicinalPlant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  uses: string[];
  regions: string[];
  conditions: string[];
  category?: string[];
}

export const initialPlants: MedicinalPlant[] = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    description: 'A powerful adaptogenic herb known for its stress-reducing and immune-boosting properties.',
    uses: ['Stress Relief', 'Immune Support', 'Sleep Aid', 'Energy Boost'],
    regions: ['India', 'North Africa', 'Middle East'],
    conditions: ['Anxiety', 'Insomnia', 'Stress', 'Fatigue'],
    category: ['Adaptogenic herbs', 'Ayurvedic']
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    description: 'A vibrant spice with potent anti-inflammatory and antioxidant effects.',
    uses: ['Anti-inflammatory', 'Antioxidant', 'Pain Relief', 'Digestive Aid'],
    regions: ['India', 'Southeast Asia'],
    conditions: ['Arthritis', 'Inflammation', 'Digestive Issues', 'Skin Conditions'],
    category: ['Spices', 'Ayurvedic']
  },
  {
    id: 'ginger',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    description: 'A warming spice with anti-nausea and digestive benefits.',
    uses: ['Nausea Relief', 'Digestive Aid', 'Anti-inflammatory', 'Pain Relief'],
    regions: ['Asia'],
    conditions: ['Nausea', 'Digestive Upset', 'Motion Sickness', 'Arthritis'],
    category: ['Spices', 'Ayurvedic']
  },
  {
    id: 'garlic',
    name: 'Garlic',
    scientificName: 'Allium sativum',
    description: 'A pungent bulb with antimicrobial and cardiovascular benefits.',
    uses: ['Immune Support', 'Cardiovascular Health', 'Antimicrobial', 'Anti-inflammatory'],
    regions: ['Worldwide'],
    conditions: ['High Blood Pressure', 'Infections', 'High Cholesterol', 'Colds'],
    category: ['Culinary herbs', 'Traditional medicine']
  },
  {
    id: 'echinacea',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    description: 'A popular herb for boosting the immune system and fighting off colds and flu.',
    uses: ['Immune Support', 'Cold & Flu Relief', 'Wound Healing'],
    regions: ['North America'],
    conditions: ['Colds', 'Flu', 'Infections', 'Wounds'],
    category: ['Immune herbs', 'Native American medicine']
  },
  {
    id: 'peppermint',
    name: 'Peppermint',
    scientificName: 'Mentha piperita',
    description: 'A refreshing herb that can soothe digestive issues and relieve headaches.',
    uses: ['Digestive Aid', 'Headache Relief', 'Muscle Relaxant', 'Decongestant'],
    regions: ['Europe', 'North America'],
    conditions: ['Indigestion', 'Headaches', 'Muscle Pain', 'Congestion'],
    category: ['Aromatic herbs', 'Essential oils']
  },
  {
    id: 'lavender',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    description: 'A fragrant herb known for its calming and relaxing properties.',
    uses: ['Relaxation', 'Sleep Aid', 'Anxiety Relief', 'Skin Healing'],
    regions: ['Mediterranean'],
    conditions: ['Anxiety', 'Insomnia', 'Stress', 'Skin Irritation'],
    category: ['Aromatic herbs', 'Essential oils']
  },
  {
    id: 'chamomile',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    description: 'A gentle herb with calming and anti-inflammatory effects.',
    uses: ['Relaxation', 'Sleep Aid', 'Digestive Aid', 'Anti-inflammatory'],
    regions: ['Europe', 'Asia', 'North America'],
    conditions: ['Anxiety', 'Insomnia', 'Digestive Upset', 'Skin Irritation'],
    category: ['Calming herbs', 'Traditional medicine']
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    description: 'A succulent plant known for its soothing and healing properties, especially for skin.',
    uses: ['Skin Healing', 'Wound Healing', 'Digestive Aid', 'Moisturizer'],
    regions: ['Africa', 'Mediterranean'],
    conditions: ['Burns', 'Sunburn', 'Skin Irritation', 'Constipation'],
    category: ['Succulents', 'Skin healing']
  },
  {
    id: 'milk-thistle',
    name: 'Milk Thistle',
    scientificName: 'Silybum marianum',
    description: 'An herb traditionally used to support liver health.',
    uses: ['Liver Support', 'Detoxification', 'Antioxidant'],
    regions: ['Europe', 'Mediterranean'],
    conditions: ['Liver Disease', 'Detoxification', 'High Cholesterol'],
    category: ['Liver herbs', 'European herbs']
  },
  {
    id: 'ginseng',
    name: 'Ginseng',
    scientificName: 'Panax ginseng',
    description: 'A root known for its energy-boosting and cognitive-enhancing properties.',
    uses: ['Energy Boost', 'Cognitive Enhancement', 'Immune Support', 'Anti-inflammatory'],
    regions: ['Asia'],
    conditions: ['Fatigue', 'Cognitive Decline', 'Weak Immune System', 'Inflammation'],
    category: ['Adaptogenic herbs', 'Traditional Chinese Medicine']
  },
  {
    id: 'licorice-root',
    name: 'Licorice Root',
    scientificName: 'Glycyrrhiza glabra',
    description: 'A sweet root with anti-inflammatory and immune-boosting properties. Use with caution.',
    uses: ['Anti-inflammatory', 'Immune Support', 'Digestive Aid', 'Sore Throat Relief'],
    regions: ['Europe', 'Asia'],
    conditions: ['Inflammation', 'Digestive Issues', 'Sore Throat', 'Adrenal Fatigue'],
    category: ['Root herbs', 'Traditional medicine']
  },
  {
    id: 'valerian-root',
    name: 'Valerian Root',
    scientificName: 'Valeriana officinalis',
    description: 'A root used as a natural sleep aid and to reduce anxiety.',
    uses: ['Sleep Aid', 'Anxiety Relief', 'Muscle Relaxant'],
    regions: ['Europe', 'Asia'],
    conditions: ['Insomnia', 'Anxiety', 'Muscle Spasms'],
    category: ['Sleep herbs', 'European herbs']
  },
  {
    id: 'st-johns-wort',
    name: "St. John's Wort",
    scientificName: 'Hypericum perforatum',
    description: 'An herb traditionally used to treat mild to moderate depression. Can interact with medications.',
    uses: ['Mood Support', 'Nerve Pain Relief', 'Wound Healing'],
    regions: ['Europe', 'Asia', 'North America'],
    conditions: ['Depression', 'Nerve Pain', 'Wounds'],
    category: ['Mood herbs', 'European herbs']
  },
  {
    id: 'calendula',
    name: 'Calendula',
    scientificName: 'Calendula officinalis',
    description: 'A flower known for its skin-healing and anti-inflammatory properties.',
    uses: ['Skin Healing', 'Anti-inflammatory', 'Wound Healing'],
    regions: ['Mediterranean'],
    conditions: ['Skin Irritation', 'Wounds', 'Burns', 'Eczema'],
    category: ['Skin herbs', 'Flower herbs']
  },
  {
    id: 'dandelion',
    name: 'Dandelion',
    scientificName: 'Taraxacum officinale',
    description: "A common 'weed' with diuretic and liver-supporting properties.",
    uses: ['Diuretic', 'Liver Support', 'Digestive Aid', 'Nutrient Source'],
    regions: ['Worldwide'],
    conditions: ['Fluid Retention', 'Liver Congestion', 'Digestive Issues'],
    category: ['Wild herbs', 'Traditional medicine']
  },
  {
    id: 'hawthorn',
    name: 'Hawthorn',
    scientificName: 'Crataegus spp.',
    description: 'A shrub with berries used to support cardiovascular health.',
    uses: ['Cardiovascular Health', 'Blood Pressure Regulation', 'Antioxidant'],
    regions: ['Europe', 'North America'],
    conditions: ['High Blood Pressure', 'Heart Failure', 'Arrhythmia'],
    category: ['Heart herbs', 'Berry herbs']
  },
  {
    id: 'senna',
    name: 'Senna',
    scientificName: 'Senna alexandrina',
    description: 'A powerful laxative herb. Use with caution and only for short-term constipation.',
    uses: ['Laxative'],
    regions: ['Africa', 'Asia'],
    conditions: ['Constipation'],
    category: ['Digestive herbs', 'Traditional medicine']
  },
  {
    id: 'psyllium',
    name: 'Psyllium',
    scientificName: 'Plantago ovata',
    description: 'A source of soluble fiber used to promote bowel regularity and lower cholesterol.',
    uses: ['Fiber Supplement', 'Laxative', 'Cholesterol Reduction'],
    regions: ['India', 'Mediterranean'],
    conditions: ['Constipation', 'High Cholesterol', 'Irritable Bowel Syndrome (IBS)'],
    category: ['Fiber herbs', 'Digestive herbs']
  }
];

export const medicinalPlants: MedicinalPlant[] = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    description: 'A powerful adaptogenic herb known for its stress-reducing and immune-boosting properties.',
    uses: ['Stress Relief', 'Immune Support', 'Sleep Aid', 'Energy Boost'],
    regions: ['India', 'North Africa', 'Middle East'],
    conditions: ['Anxiety', 'Insomnia', 'Stress', 'Fatigue']
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    description: 'A vibrant spice with potent anti-inflammatory and antioxidant effects.',
    uses: ['Anti-inflammatory', 'Antioxidant', 'Pain Relief', 'Digestive Aid'],
    regions: ['India', 'Southeast Asia'],
    conditions: ['Arthritis', 'Inflammation', 'Digestive Issues', 'Skin Conditions']
  },
  {
    id: 'ginger',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    description: 'A warming spice with anti-nausea and digestive benefits.',
    uses: ['Nausea Relief', 'Digestive Aid', 'Anti-inflammatory', 'Pain Relief'],
    regions: ['Asia'],
    conditions: ['Nausea', 'Digestive Upset', 'Motion Sickness', 'Arthritis']
  },
  {
    id: 'garlic',
    name: 'Garlic',
    scientificName: 'Allium sativum',
    description: 'A pungent bulb with antimicrobial and cardiovascular benefits.',
    uses: ['Immune Support', 'Cardiovascular Health', 'Antimicrobial', 'Anti-inflammatory'],
    regions: ['Worldwide'],
    conditions: ['High Blood Pressure', 'Infections', 'High Cholesterol', 'Colds']
  },
  {
    id: 'echinacea',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    description: 'A popular herb for boosting the immune system and fighting off colds and flu.',
    uses: ['Immune Support', 'Cold & Flu Relief', 'Wound Healing'],
    regions: ['North America'],
    conditions: ['Colds', 'Flu', 'Infections', 'Wounds']
  },
  {
    id: 'peppermint',
    name: 'Peppermint',
    scientificName: 'Mentha piperita',
    description: 'A refreshing herb that can soothe digestive issues and relieve headaches.',
    uses: ['Digestive Aid', 'Headache Relief', 'Muscle Relaxant', 'Decongestant'],
    regions: ['Europe', 'North America'],
    conditions: ['Indigestion', 'Headaches', 'Muscle Pain', 'Congestion']
  },
  {
    id: 'lavender',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    description: 'A fragrant herb known for its calming and relaxing properties.',
    uses: ['Relaxation', 'Sleep Aid', 'Anxiety Relief', 'Skin Healing'],
    regions: ['Mediterranean'],
    conditions: ['Anxiety', 'Insomnia', 'Stress', 'Skin Irritation']
  },
  {
    id: 'chamomile',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    description: 'A gentle herb with calming and anti-inflammatory effects.',
    uses: ['Relaxation', 'Sleep Aid', 'Digestive Aid', 'Anti-inflammatory'],
    regions: ['Europe', 'Asia', 'North America'],
    conditions: ['Anxiety', 'Insomnia', 'Digestive Upset', 'Skin Irritation']
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    description: 'A succulent plant known for its soothing and healing properties, especially for skin.',
    uses: ['Skin Healing', 'Wound Healing', 'Digestive Aid', 'Moisturizer'],
    regions: ['Africa', 'Mediterranean'],
    conditions: ['Burns', 'Sunburn', 'Skin Irritation', 'Constipation']
  },
  {
    id: 'milk-thistle',
    name: 'Milk Thistle',
    scientificName: 'Silybum marianum',
    description: 'An herb traditionally used to support liver health.',
    uses: ['Liver Support', 'Detoxification', 'Antioxidant'],
    regions: ['Europe', 'Mediterranean'],
    conditions: ['Liver Disease', 'Detoxification', 'High Cholesterol']
  },
  {
    id: 'ginseng',
    name: 'Ginseng',
    scientificName: 'Panax ginseng',
    description: 'A root known for its energy-boosting and cognitive-enhancing properties.',
    uses: ['Energy Boost', 'Cognitive Enhancement', 'Immune Support', 'Anti-inflammatory'],
    regions: ['Asia'],
    conditions: ['Fatigue', 'Cognitive Decline', 'Weak Immune System', 'Inflammation']
  },
  {
    id: 'licorice-root',
    name: 'Licorice Root',
    scientificName: 'Glycyrrhiza glabra',
    description: 'A sweet root with anti-inflammatory and immune-boosting properties. Use with caution.',
    uses: ['Anti-inflammatory', 'Immune Support', 'Digestive Aid', 'Sore Throat Relief'],
    regions: ['Europe', 'Asia'],
    conditions: ['Inflammation', 'Digestive Issues', 'Sore Throat', 'Adrenal Fatigue']
  },
  {
    id: 'valerian-root',
    name: 'Valerian Root',
    scientificName: 'Valeriana officinalis',
    description: 'A root used as a natural sleep aid and to reduce anxiety.',
    uses: ['Sleep Aid', 'Anxiety Relief', 'Muscle Relaxant'],
    regions: ['Europe', 'Asia'],
    conditions: ['Insomnia', 'Anxiety', 'Muscle Spasms']
  },
  {
    id: 'st-johns-wort',
    name: "St. John's Wort",
    scientificName: 'Hypericum perforatum',
    description: 'An herb traditionally used to treat mild to moderate depression. Can interact with medications.',
    uses: ['Mood Support', 'Nerve Pain Relief', 'Wound Healing'],
    regions: ['Europe', 'Asia', 'North America'],
    conditions: ['Depression', 'Nerve Pain', 'Wounds']
  },
  {
    id: 'calendula',
    name: 'Calendula',
    scientificName: 'Calendula officinalis',
    description: 'A flower known for its skin-healing and anti-inflammatory properties.',
    uses: ['Skin Healing', 'Anti-inflammatory', 'Wound Healing'],
    regions: ['Mediterranean'],
    conditions: ['Skin Irritation', 'Wounds', 'Burns', 'Eczema']
  },
  {
    id: 'dandelion',
    name: 'Dandelion',
    scientificName: 'Taraxacum officinale',
    description: "A common 'weed' with diuretic and liver-supporting properties.",
    uses: ['Diuretic', 'Liver Support', 'Digestive Aid', 'Nutrient Source'],
    regions: ['Worldwide'],
    conditions: ['Fluid Retention', 'Liver Congestion', 'Digestive Issues']
  },
  {
    id: 'hawthorn',
    name: 'Hawthorn',
    scientificName: 'Crataegus spp.',
    description: 'A shrub with berries used to support cardiovascular health.',
    uses: ['Cardiovascular Health', 'Blood Pressure Regulation', 'Antioxidant'],
    regions: ['Europe', 'North America'],
    conditions: ['High Blood Pressure', 'Heart Failure', 'Arrhythmia']
  },
  {
    id: 'senna',
    name: 'Senna',
    scientificName: 'Senna alexandrina',
    description: 'A powerful laxative herb. Use with caution and only for short-term constipation.',
    uses: ['Laxative'],
    regions: ['Africa', 'Asia'],
    conditions: ['Constipation']
  },
  {
    id: 'psyllium',
    name: 'Psyllium',
    scientificName: 'Plantago ovata',
    description: 'A source of soluble fiber used to promote bowel regularity and lower cholesterol.',
    uses: ['Fiber Supplement', 'Laxative', 'Cholesterol Reduction'],
    regions: ['India', 'Mediterranean'],
    conditions: ['Constipation', 'High Cholesterol', 'Irritable Bowel Syndrome (IBS)']
  }
]; 