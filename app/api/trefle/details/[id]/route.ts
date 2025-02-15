import { NextResponse } from 'next/server';

const TREFLE_API_URL = 'https://trefle.io/api/v1';
const TREFLE_TOKEN = process.env.TREFLE_API_TOKEN;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!TREFLE_TOKEN) {
      throw new Error('Trefle API token not found in environment variables');
    }

    const response = await fetch(
      `${TREFLE_API_URL}/species/${params.id}?token=${TREFLE_TOKEN}`,
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
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Trefle API details route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plant details' },
      { status: 500 }
    );
  }
}