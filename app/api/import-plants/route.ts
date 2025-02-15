import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Plant } from '@/models/Plant';
import { promises as fs } from 'fs';
import path from 'path';
import { initialPlants } from '@/data/medicinal-plants';

interface PlantData {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  uses: string[];
  regions: string[];
  conditions: string[];
  category?: string[];
}

// GET endpoint for importing plants from file
export async function GET() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');
    
    const filePath = path.join(process.cwd(), 'plant data json.txt');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const plants = JSON.parse(fileContent);

    const validPlants = plants.filter((plant: any) => 
      plant.id && plant.name && plant.scientificName && plant.description
    );

    await Plant.deleteMany({});
    console.log('Cleared existing plants');

    const result = await Plant.insertMany(validPlants);
    console.log(`Imported ${result.length} plants`);

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${result.length} plants`,
      count: result.length
    });

  } catch (error: any) {
    console.error('Import failed:', error);
    return NextResponse.json(
      { error: 'Import failed', details: error.message },
      { status: 500 }
    );
  }
}

// POST endpoint for importing plants from request body
export async function POST() {
  try {
    await connectToDatabase();
    
    // Clear existing plants
    await Plant.deleteMany({});
    console.log('Cleared existing plants');
    
    // Import initial plants
    const result = await Plant.insertMany(initialPlants);
    console.log(`Imported ${result.length} plants`);
    
    return NextResponse.json({ 
      message: 'Plants imported successfully',
      count: result.length 
    });
  } catch (error: any) {
    console.error('Failed to import plants:', error);
    return NextResponse.json(
      { error: 'Failed to import plants', details: error.message },
      { status: 500 }
    );
  }
}