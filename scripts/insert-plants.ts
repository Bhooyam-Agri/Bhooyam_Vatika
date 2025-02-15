import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Initialize MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhooyam';
const dbName = 'bhooyam';
const collectionName = 'medicinal_plants';

// Plant data to insert
const plantsToInsert = [
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
    id: 'holy-basil',
    name: 'Holy Basil (Tulsi)',
    scientificName: 'Ocimum tenuiflorum',
    description: 'An adaptogenic herb used in Ayurvedic medicine for stress relief and immune support.',
    uses: ['Stress Relief', 'Immune Support', 'Antioxidant', 'Anti-inflammatory'],
    regions: ['India'],
    conditions: ['Stress', 'Anxiety', 'Infections', 'Inflammation']
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
  },
  {
    id: 'neem',
    name: 'Neem',
    scientificName: 'Azadirachta indica',
    description: 'A versatile tree with powerful antimicrobial and immune-modulating properties.',
    uses: ['Antimicrobial', 'Skin Care', 'Dental Health', 'Pest Control'],
    regions: ['India', 'Southeast Asia'],
    conditions: ['Skin Infections', 'Dental Problems', 'Inflammation', 'Parasitic Infections']
  },
  {
    id: 'moringa',
    name: 'Moringa',
    scientificName: 'Moringa oleifera',
    description: 'A nutrient-rich plant known as the "miracle tree" for its diverse health benefits.',
    uses: ['Nutritional Support', 'Anti-inflammatory', 'Antioxidant', 'Energy Boost'],
    regions: ['India', 'Africa'],
    conditions: ['Malnutrition', 'Inflammation', 'Fatigue', 'Oxidative Stress']
  },
  {
    id: 'elderberry',
    name: 'Elderberry',
    scientificName: 'Sambucus nigra',
    description: 'A berry rich in antioxidants and immune-boosting compounds.',
    uses: ['Immune Support', 'Cold & Flu Relief', 'Antioxidant', 'Anti-viral'],
    regions: ['Europe', 'North America'],
    conditions: ['Common Cold', 'Flu', 'Upper Respiratory Infections', 'Inflammation']
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    scientificName: 'Rosmarinus officinalis',
    description: 'An aromatic herb that enhances memory and cognitive function.',
    uses: ['Cognitive Enhancement', 'Antioxidant', 'Antimicrobial', 'Digestive Aid'],
    regions: ['Mediterranean'],
    conditions: ['Memory Loss', 'Mental Fatigue', 'Digestive Issues', 'Hair Loss']
  },
  {
    id: 'sage',
    name: 'Sage',
    scientificName: 'Salvia officinalis',
    description: 'A medicinal herb known for its cognitive benefits and antimicrobial properties.',
    uses: ['Memory Enhancement', 'Antimicrobial', 'Menopausal Support', 'Oral Health'],
    regions: ['Mediterranean', 'Europe'],
    conditions: ['Cognitive Decline', 'Hot Flashes', 'Oral Infections', 'Excessive Sweating']
  },
  {
    id: 'thyme',
    name: 'Thyme',
    scientificName: 'Thymus vulgaris',
    description: 'An herb with powerful antimicrobial and respiratory health benefits.',
    uses: ['Respiratory Support', 'Antimicrobial', 'Cough Relief', 'Immune Support'],
    regions: ['Mediterranean', 'Europe'],
    conditions: ['Bronchitis', 'Cough', 'Respiratory Infections', 'Sore Throat']
  },
  {
    id: 'oregano',
    name: 'Oregano',
    scientificName: 'Origanum vulgare',
    description: 'A potent antimicrobial herb with immune-boosting properties.',
    uses: ['Antimicrobial', 'Immune Support', 'Digestive Aid', 'Anti-inflammatory'],
    regions: ['Mediterranean', 'Europe'],
    conditions: ['Infections', 'Digestive Issues', 'Respiratory Problems', 'Inflammation']
  },
  {
    id: 'lemon-balm',
    name: 'Lemon Balm',
    scientificName: 'Melissa officinalis',
    description: 'A calming herb that supports relaxation and cognitive function.',
    uses: ['Stress Relief', 'Sleep Aid', 'Cognitive Support', 'Digestive Aid'],
    regions: ['Europe', 'Mediterranean', 'Central Asia'],
    conditions: ['Anxiety', 'Insomnia', 'Digestive Issues', 'Cognitive Decline']
  },
  {
    id: 'feverfew',
    name: 'Feverfew',
    scientificName: 'Tanacetum parthenium',
    description: 'A traditional herb used for migraine prevention and fever reduction.',
    uses: ['Migraine Prevention', 'Pain Relief', 'Fever Reduction', 'Anti-inflammatory'],
    regions: ['Europe', 'Americas'],
    conditions: ['Migraines', 'Fever', 'Arthritis', 'Menstrual Pain']
  },
  {
    id: 'marshmallow-root',
    name: 'Marshmallow Root',
    scientificName: 'Althaea officinalis',
    description: 'A soothing herb that helps with respiratory and digestive issues.',
    uses: ['Respiratory Support', 'Digestive Aid', 'Skin Soothing', 'Cough Relief'],
    regions: ['Europe', 'Western Asia'],
    conditions: ['Cough', 'Sore Throat', 'Digestive Inflammation', 'Skin Irritation']
  }
];

async function main() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Clear existing plants first
    await collection.deleteMany({});
    console.log('Cleared existing plants from database');

    // Insert all plants
    const result = await collection.insertMany(plantsToInsert.map(plant => ({
      ...plant,
      metadata: {
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
    })));

    console.log(`Successfully inserted ${result.insertedCount} plants into the database`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

main().catch(console.error); 