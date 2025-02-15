import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { name, scientificName, shortDescription, primaryUses, nativeRegions } = await req.json();

    const prompt = `
      Please provide detailed information about the medicinal plant:
      Name: ${name}
      Scientific Name: ${scientificName}
      Basic Info: ${shortDescription}
      Primary Uses: ${primaryUses.join(', ')}
      Native Regions: ${nativeRegions.join(', ')}

      Please provide a comprehensive response in the following format:
      {
        "traditionalUses": [detailed list of traditional medicinal uses],
        "scientificResearch": [summary of key scientific studies and findings],
        "preparation": {
          "methods": [common preparation methods],
          "dosage": "general dosage guidelines",
          "precautions": [important safety precautions]
        },
        "interactions": [known drug interactions or contraindications],
        "historicalUse": "brief history of the plant's use in traditional medicine",
        "modernApplications": [current medical and therapeutic applications]
      }

      Focus on evidence-based information and include relevant safety warnings.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert in medicinal plants and traditional medicine with deep knowledge of both historical uses and modern scientific research. Provide accurate, well-structured information about medicinal plants, always emphasizing safety and evidence-based practices."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4",
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response content from OpenAI');
    }

    return NextResponse.json(JSON.parse(responseContent));

  } catch (error) {
    console.error('Error generating plant details:', error);
    return NextResponse.json(
      { error: 'Failed to generate plant details' },
      { status: 500 }
    );
  }
}
