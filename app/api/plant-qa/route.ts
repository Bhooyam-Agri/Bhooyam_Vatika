import { NextRequest, NextResponse } from 'next/server';
import { getPlantQA, getPlantInsights } from '@/app/services/ai.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plantName, scientificName, question, type } = body;

    if (!plantName || !scientificName) {
      return NextResponse.json(
        { error: 'Plant name and scientific name are required' },
        { status: 400 }
      );
    }

    let response;
    if (type === 'insights') {
      response = await getPlantInsights({ name: plantName, scientificName });
    } else {
      if (!question) {
        return NextResponse.json(
          { error: 'Question is required for Q&A' },
          { status: 400 }
        );
      }
      response = await getPlantQA(plantName, scientificName, question);
    }

    return NextResponse.json({ data: response });
  } catch (error: any) {
    console.error('Plant QA API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
} 