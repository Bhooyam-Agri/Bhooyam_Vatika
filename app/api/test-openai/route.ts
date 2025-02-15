import { NextResponse } from 'next/server';
import { generateWithOpenAI } from '@/app/services/ai.service';

export async function GET() {
  try {
    const prompt = 'Generate a detailed description of the medicinal uses of Ashwagandha (Withania somnifera).';
    const result = await generateWithOpenAI(prompt);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Failed to generate content:', error);
    return NextResponse.json({ error: 'Failed to generate content', details: error.message }, { status: 500 });
  }
}