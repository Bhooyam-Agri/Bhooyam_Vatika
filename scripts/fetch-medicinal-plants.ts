import { readFileSync } from 'fs';
import { join } from 'path';
import mongoose from 'mongoose';
import { Plant } from '@/models/Plant';
import dotenv from 'dotenv';

dotenv.config();

async function importPlantsToMongoDB() {
  try {
    // Read the JSON file
    const filePath = join(process.cwd(), 'data', 'plants.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const plantsData = JSON.parse(fileContent).plants;

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing plants
    await Plant.deleteMany({});
    console.log('Cleared existing plants');

    // Insert plants
    const result = await Plant.insertMany(plantsData);
    console.log(`Successfully imported ${result.length} plants to MongoDB`);

    return result;
  } catch (error) {
    console.error('Error importing plants:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

async function main() {
  try {
    console.log('Starting plant import...');
    const plants = await importPlantsToMongoDB();
    console.log(`\nImported ${plants.length} plants to MongoDB`);
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
}

main();