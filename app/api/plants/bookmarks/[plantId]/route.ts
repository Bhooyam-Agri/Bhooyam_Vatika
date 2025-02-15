import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Plant } from '@/models/Plant';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { plantId: string } }
) {
  try {
    const { plantId } = params;
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const plant = await Plant.findByIdAndUpdate(
      plantId,
      {
        $pull: { 'bookmarks.userId': userId }
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
    console.error('Error removing plant bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to remove bookmark' },
      { status: 500 }
    );
  }
} 