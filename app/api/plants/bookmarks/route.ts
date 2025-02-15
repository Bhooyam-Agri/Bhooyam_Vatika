import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Plant } from '@/models/Plant';

// GET endpoint to fetch user's bookmarked plants
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const bookmarkedPlants = await Plant.find({ 'bookmarks.userId': userId });
    return NextResponse.json(bookmarkedPlants);
  } catch (error: any) {
    console.error('Error fetching bookmarked plants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookmarked plants' },
      { status: 500 }
    );
  }
}

// POST endpoint to add a plant bookmark
export async function POST(request: NextRequest) {
  try {
    const { plantId, userId } = await request.json();

    if (!plantId || !userId) {
      return NextResponse.json(
        { error: 'Plant ID and User ID are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const plant = await Plant.findByIdAndUpdate(
      plantId,
      {
        $addToSet: { 'bookmarks.userId': userId }
      },
      { new: true }
    );

    if (!plant) {
      return NextResponse.json(
        { error: 'Plant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(plant);
  } catch (error: any) {
    console.error('Error adding plant bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to add bookmark' },
      { status: 500 }
    );
  }
} 