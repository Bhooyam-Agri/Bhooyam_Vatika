const fs = require('fs');
const path = require('path');
const https = require('https');
const { IncomingMessage } = require('http');

const PLANT_IMAGES: Record<string, string> = {
  'ashwagandha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Withania_somnifera_-_Kerala_02.jpg/800px-Withania_somnifera_-_Kerala_02.jpg',
  'turmeric': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Curcuma_longa_roots.jpg/800px-Curcuma_longa_roots.jpg',
  'tulsi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ocimum_tenuiflorum_plant.jpg/800px-Ocimum_tenuiflorum_plant.jpg',
  'ginger': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Starr_070730-7818_Zingiber_officinale.jpg/800px-Starr_070730-7818_Zingiber_officinale.jpg',
  'meadowsweet': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Filipendula_ulmaria_kz01.jpg/800px-Filipendula_ulmaria_kz01.jpg',
  'neem': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Neem_tree_leaves.jpg/800px-Neem_tree_leaves.jpg',
  'aloe-vera': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/800px-Aloe_vera_flower_inset.png',
  'mint': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mentha_x_piperita_-_Köhler–s_Medizinal-Pflanzen-095.jpg/800px-Mentha_x_piperita_-_Köhler–s_Medizinal-Pflanzen-095.jpg',
  'chamomile': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Matricaria_February_2008-1.jpg/800px-Matricaria_February_2008-1.jpg',
  'lavender': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Single_lavendar_flower02.jpg/800px-Single_lavendar_flower02.jpg'
};

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response: IncomingMessage) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve());
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
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
  for (const [plantId, imageUrl] of Object.entries(PLANT_IMAGES)) {
    const filepath = path.join(plantsDir, `${plantId}.jpg`);
    
    if (!fs.existsSync(filepath)) {
      console.log(`Downloading image for ${plantId}...`);
      try {
        await downloadImage(imageUrl, filepath);
        console.log(`✓ Successfully downloaded image for ${plantId}`);
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