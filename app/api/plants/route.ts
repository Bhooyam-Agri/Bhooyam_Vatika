import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Plant } from '@/models/Plant';

export async function GET() {
  try {
    await connectToDatabase();
    const plants = await Plant.find({});
    return NextResponse.json(plants);
  } catch (error: any) {
    console.error('Failed to fetch plants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plants', details: error.message },
      { status: 500 }
    );
  }
}