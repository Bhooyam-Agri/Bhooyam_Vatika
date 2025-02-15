import { NextResponse } from 'next/server';
import { usePlantsStore } from '@/lib/plants';

export async function GET() {
  try {
    // Rotate to next daily plant
    usePlantsStore.getState().rotateDailyPlant();
    
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error rotating daily plant:', error);
    return NextResponse.json(
      { error: 'Failed to rotate daily plant' },
      { status: 500 }
    );
  }
}

// Run once per day at midnight
export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours in seconds