const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

const TREFLE_API_URL = 'https://trefle.io/api/v1';
const TREFLE_API_KEY = process.env.TREFLE_API_KEY;

const PLANT_DATA = {
  'ashwagandha': {
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    description: 'A powerful adaptogenic herb known for its stress-reducing and immune-boosting properties.'
  },
  'turmeric': {
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    description: 'A vibrant spice with potent anti-inflammatory and antioxidant effects.'
  },
  'tulsi': {
    name: 'Holy Basil (Tulsi)',
    scientificName: 'Ocimum tenuiflorum',
    description: 'An adaptogenic herb used in Ayurvedic medicine for stress relief and immune support.'
  },
  'psyllium': {
    name: 'Psyllium',
    scientificName: 'Plantago ovata',
    description: 'A natural fiber supplement that aids in digestive health.'
  },
  'garlic': {
    name: 'Garlic',
    scientificName: 'Allium sativum',
    description: 'A powerful antimicrobial herb used for infections and immune support.'
  },
  'ginger': {
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    description: 'A warming herb used for nausea, digestion, and inflammation.'
  },
  'cardamom': {
    name: 'Cardamom',
    scientificName: 'Elettaria cardamomum',
    description: 'A sweet and aromatic spice that aids digestion and freshens breath.'
  },
  'coriander': {
    name: 'Coriander',
    scientificName: 'Coriandrum sativum',
    description: 'An herb with cooling properties used in digestive health.'
  },
  'fennel': {
    name: 'Fennel',
    scientificName: 'Foeniculum vulgare',
    description: 'A sweet herb used for digestive issues and bloating.'
  },
  'mint': {
    name: 'Mint',
    scientificName: 'Mentha × piperita',
    description: 'A cooling herb used for digestion and freshening breath.'
  }
};

// Fallback image URLs if Trefle doesn't have an image
const FALLBACK_IMAGES = {
  'ashwagandha': 'https://images.pexels.com/photos/6945066/pexels-photo-6945066.jpeg',
  'turmeric': 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7',
  'tulsi': 'https://images.unsplash.com/photo-1600333859399-228aa03f7dba',
  'psyllium': 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg',
  'garlic': 'https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg',
  'ginger': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5',
  'cardamom': 'https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg',
  'coriander': 'https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg',
  'fennel': 'https://images.pexels.com/photos/4198643/pexels-photo-4198643.jpeg',
  'mint': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1'
};

async function searchTreflePlant(scientificName) {
  try {
    if (!TREFLE_API_KEY) {
      throw new Error('Trefle API key is not configured');
    }

    const response = await fetch(
      `${TREFLE_API_URL}/species/search?token=${TREFLE_API_KEY}&q=${encodeURIComponent(scientificName)}`
    );

    if (!response.ok) {
      throw new Error(`Trefle API error: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log(`Found ${data.data.length} results for ${scientificName}`);
    
    const exactMatch = data.data.find(
      plant => plant.scientific_name.toLowerCase() === scientificName.toLowerCase()
    );

    if (exactMatch) {
      console.log(`Found exact match for ${scientificName}`);
    }

    return exactMatch;
  } catch (error) {
    console.error('Error fetching from Trefle:', error);
    return null;
  }
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Add query parameters for image optimization
    const imageUrl = url.includes('unsplash.com') 
      ? `${url}?auto=format&fit=crop&w=800&q=80`
      : url.includes('pexels.com')
        ? `${url}?auto=compress&w=800`
        : url; // Use original URL for Trefle images
    
    https.get(imageUrl, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve());
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  // Ensure we're using the correct path separator for Windows
  const publicDir = path.join(process.cwd(), 'public');
  const plantsDir = path.join(publicDir, 'plants');

  console.log('Creating directories if they don\'t exist...');
  console.log('Public directory:', publicDir);
  console.log('Plants directory:', plantsDir);

  // Create directories if they don't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
    console.log('Created public directory');
  }
  if (!fs.existsSync(plantsDir)) {
    fs.mkdirSync(plantsDir);
    console.log('Created plants directory');
  }

  // Download each plant image
  for (const [plantId, plantInfo] of Object.entries(PLANT_DATA)) {
    const filepath = path.join(plantsDir, `${plantId}.jpg`);
    
    if (!fs.existsSync(filepath)) {
      console.log(`Processing ${plantInfo.name}...`);
      try {
        // Try to get image from Trefle first
        const trefleData = await searchTreflePlant(plantInfo.scientificName);
        const imageUrl = trefleData?.image_url || FALLBACK_IMAGES[plantId];

        if (imageUrl) {
          console.log(`Downloading image for ${plantId} from ${trefleData ? 'Trefle' : 'fallback source'}...`);
          await downloadImage(imageUrl, filepath);
          console.log(`✓ Successfully downloaded image for ${plantId}`);
        } else {
          console.error(`✗ No image available for ${plantId}`);
        }
      } catch (error) {
        console.error(`✗ Failed to download image for ${plantId}:`, error);
      }
    } else {
      console.log(`→ Image for ${plantId} already exists`);
    }
  }

  console.log('\nAll downloads completed!');
}

main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
}); 