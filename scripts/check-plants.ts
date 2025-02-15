import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhooyam';
const dbName = 'bhooyam';
const collectionName = 'medicinal_plants';

interface PlantAnalysis {
  totalPlants: number;
  regionStats: { [key: string]: number };
  commonUses: { [key: string]: number };
  commonConditions: { [key: string]: number };
}

async function analyzePlants(plants: any[]): Promise<PlantAnalysis> {
  const analysis: PlantAnalysis = {
    totalPlants: plants.length,
    regionStats: {},
    commonUses: {},
    commonConditions: {}
  };

  plants.forEach(plant => {
    // Analyze regions
    plant.regions.forEach((region: string) => {
      analysis.regionStats[region] = (analysis.regionStats[region] || 0) + 1;
    });

    // Analyze uses
    plant.uses.forEach((use: string) => {
      analysis.commonUses[use] = (analysis.commonUses[use] || 0) + 1;
    });

    // Analyze conditions
    plant.conditions.forEach((condition: string) => {
      analysis.commonConditions[condition] = (analysis.commonConditions[condition] || 0) + 1;
    });
  });

  return analysis;
}

function sortByValue(obj: { [key: string]: number }): [string, number][] {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function printSection(title: string) {
  console.log('\n' + '='.repeat(80));
  console.log(title);
  console.log('='.repeat(80));
}

function printSubSection(title: string) {
  console.log('\n' + '-'.repeat(40));
  console.log(title);
  console.log('-'.repeat(40));
}

async function main() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Get all plants and sort by name
    const plants = await collection.find({}).sort({ name: 1 }).toArray();
    const analysis = await analyzePlants(plants);
    
    printSection('MEDICINAL PLANTS DATABASE ANALYSIS');
    console.log(`\nTotal Plants in Database: ${analysis.totalPlants}`);

    printSubSection('REGIONAL DISTRIBUTION');
    const sortedRegions = sortByValue(analysis.regionStats);
    const maxRegionLength = Math.max(...sortedRegions.map(([region]) => region.length));
    sortedRegions.forEach(([region, count]) => {
      const percentage = ((count / analysis.totalPlants) * 100).toFixed(1);
      console.log(`${region.padEnd(maxRegionLength + 2)}: ${count.toString().padStart(2)} plants (${percentage.padStart(4)}%)`);
    });

    printSubSection('TOP 10 MEDICINAL USES');
    const topUses = sortByValue(analysis.commonUses).slice(0, 10);
    const maxUseLength = Math.max(...topUses.map(([use]) => use.length));
    topUses.forEach(([use, count]) => {
      const percentage = ((count / analysis.totalPlants) * 100).toFixed(1);
      console.log(`${use.padEnd(maxUseLength + 2)}: ${count.toString().padStart(2)} plants (${percentage.padStart(4)}%)`);
    });

    printSubSection('TOP 10 TREATED CONDITIONS');
    const topConditions = sortByValue(analysis.commonConditions).slice(0, 10);
    const maxConditionLength = Math.max(...topConditions.map(([condition]) => condition.length));
    topConditions.forEach(([condition, count]) => {
      const percentage = ((count / analysis.totalPlants) * 100).toFixed(1);
      console.log(`${condition.padEnd(maxConditionLength + 2)}: ${count.toString().padStart(2)} plants (${percentage.padStart(4)}%)`);
    });

    printSection('COMPLETE PLANT LIST');
    plants.forEach((plant, index) => {
      console.log(`\n${(index + 1).toString().padStart(2)}. ${plant.name}`);
      console.log(`    Scientific Name : ${plant.scientificName}`);
      console.log(`    Description    : ${plant.description}`);
      console.log(`    Primary Uses   : ${plant.uses.join(', ')}`);
      console.log(`    Native Regions : ${plant.regions.join(', ')}`);
      console.log(`    Conditions     : ${plant.conditions.join(', ')}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

main().catch(console.error); 