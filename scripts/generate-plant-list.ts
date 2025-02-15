import { MongoClient } from 'mongodb';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BATCH_SIZE = 50; // Number of plants to generate in each API call
const TOTAL_PLANTS = 500;
const OUTPUT_FILE = 'generated-plants.json';

interface Plant {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  shortDescription: string;
  primaryUses: string[];
  nativeRegions: string[];
  imageUrl?: string;
}

async function generatePlantBatch(startIndex: number, batchSize: number): Promise<Plant[]> {
  const prompt = `Generate ${batchSize} unique medicinal plants (starting from index ${startIndex + 1}) with the following information for each:
  - Common name
  - Scientific name
  - Plant family
  - A short description (1-2 sentences about its key medicinal properties)
  - Primary uses (4-5 main medicinal uses)
  - Native regions where it grows

  Focus on plants that:
  1. Have documented medicinal properties
  2. Are used in traditional medicine systems worldwide
  3. Have some scientific research backing their uses
  4. Include a mix of well-known and lesser-known but important plants

  Return the response as a JSON object with a 'plants' array containing the plant objects with this structure:
  {
    "plants": [
      {
        "id": "plant-name-in-kebab-case",
        "name": "Common Name",
        "scientificName": "Scientific Name",
        "family": "Plant Family",
        "shortDescription": "Brief description",
        "primaryUses": ["use1", "use2", "use3", "use4"],
        "nativeRegions": ["region1", "region2"]
      }
    ]
  }

  Ensure scientific accuracy and variety in the selection.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a botanical expert with extensive knowledge of medicinal plants worldwide. Provide accurate, well-researched information about medicinal plants, including their traditional uses and native habitats."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4",
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response content from OpenAI');
    }

    const data = JSON.parse(responseContent);
    if (!data.plants || !Array.isArray(data.plants)) {
      throw new Error('Invalid response format from OpenAI');
    }

    return data.plants;
  } catch (error) {
    console.error('Error generating plant batch:', error);
    throw error;
  }
}

async function saveToMongoDB(plants: Plant[]) {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhooyam';
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('bhooyam');
    const collection = db.collection('medicinal_plants');

    for (const plant of plants) {
      const existingPlant = await collection.findOne({ id: plant.id });
      if (!existingPlant) {
        await collection.insertOne({
          ...plant,
          metadata: {
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          }
        });
        console.log(`Stored ${plant.name} in database`);
      } else {
        console.log(`${plant.name} already exists in database, skipping...`);
      }
    }
  } finally {
    await client.close();
  }
}

async function main() {
  const allPlants: Plant[] = [];
  
  for (let i = 0; i < TOTAL_PLANTS; i += BATCH_SIZE) {
    try {
      console.log(`Generating batch ${i / BATCH_SIZE + 1} of ${Math.ceil(TOTAL_PLANTS / BATCH_SIZE)}...`);
      const plants = await generatePlantBatch(i, Math.min(BATCH_SIZE, TOTAL_PLANTS - i));
      allPlants.push(...plants);

      // Save the current progress to a file
      await fs.writeFile(
        path.join(process.cwd(), OUTPUT_FILE),
        JSON.stringify(allPlants, null, 2)
      );

      // Save this batch to MongoDB
      await saveToMongoDB(plants);

      // Wait a bit between batches to avoid rate limits
      if (i + BATCH_SIZE < TOTAL_PLANTS) {
        console.log('Waiting 10 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    } catch (error) {
      console.error(`Error processing batch starting at index ${i}:`, error);
      // Save progress so far
      if (allPlants.length > 0) {
        await fs.writeFile(
          path.join(process.cwd(), OUTPUT_FILE),
          JSON.stringify(allPlants, null, 2)
        );
      }
      throw error;
    }
  }

  console.log(`Successfully generated and stored ${allPlants.length} plants`);
  console.log(`Full plant data saved to ${OUTPUT_FILE}`);
}

main().catch(console.error); 