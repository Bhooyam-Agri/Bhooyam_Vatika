import { NextRequest, NextResponse } from 'next/server';

const TREFLE_API_URL = 'https://trefle.io/api/v1';
const TREFLE_TOKEN = process.env.TREFLE_API_TOKEN;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (!TREFLE_TOKEN) {
      throw new Error('Trefle API token not found in environment variables');
    }

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const response = await fetch(
      `${TREFLE_API_URL}/species/search?q=${encodeURIComponent(query)}&token=${TREFLE_TOKEN}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Trefle API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform the response to include high-quality images
    const enrichedData = {
      ...data,
      data: data.data.map((plant: any) => ({
        ...plant,
        image_url: plant.image_url || plant.images?.flower?.[0]?.image_url || plant.images?.habit?.[0]?.image_url || plant.images?.leaf?.[0]?.image_url
      }))
    };

    return NextResponse.json(enrichedData);
  } catch (error) {
    console.error('Error in Trefle API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plant data' },
      { status: 500 }
    );
  }
}

export async function HEAD(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD',
    },
  });
}