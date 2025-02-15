import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Plant } from '@/models/Plant';

export async function GET() {
  try {
    await connectToDatabase();
    const count = await Plant.countDocuments();
    const plants = await Plant.find({}).limit(5); // Get first 5 plants as sample

    return NextResponse.json({
      success: true,
      totalPlants: count,
      samplePlants: plants
    });

  } catch (error: any) {
    console.error('Failed to check plants:', error);
    return NextResponse.json(
      { error: 'Failed to check plants', details: error.message },
      { status: 500 }
    );
  }
}