import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Add this at the top of the file to debug
console.log('API Keys:', {
  openai: process.env.OPENAI_API_KEY?.slice(0, 10) + '...',
  gemini: process.env.GEMINI_API_KEY?.slice(0, 10) + '...'
});

// Update the API client initialization with better error handling
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Add a function to validate API keys
const validateAPIKeys = () => {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-REAL_OPENAI_API_KEY_HERE") {
    throw new Error('Invalid OpenAI API key configuration');
  }
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "REAL_GOOGLE_API_KEY_HERE") {
    throw new Error('Invalid Gemini API key configuration');
  }
};

const getSampleResponse = (plantName: string, scientificName: string, question?: string) => {
  return `Here is some information about ${plantName} (${scientificName}):
    
    Medicinal Properties:
    - Anti-inflammatory
    - Antioxidant properties
    - Digestive aid
    
    Traditional Uses:
    - Used in traditional medicine for digestive issues
    - Applied topically for skin conditions
    - Consumed as a tea for relaxation
    
    ${question ? `
    Regarding your question: "${question}"
    This is a sample response as the AI service is currently unavailable.
    Please ensure you have valid API keys configured.
    ` : ''}
    
    Note: This is a sample response. Please configure valid API keys for actual AI-generated responses.`;
};

export async function POST(req: NextRequest) {
  try {
    const { plantName, scientificName, question, type } = await req.json();

    if (!plantName || !scientificName) {
      return NextResponse.json(
        { error: 'Plant name and scientific name are required' },
        { status: 400 }
      );
    }

    let response;

    try {
      // Try OpenAI first
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4",
        temperature: 0.7,
        max_tokens: 1000,
      });

      response = completion.choices[0]?.message?.content;
      if (!response) throw new Error('No content from OpenAI');
    } catch (openaiError) {
      try {
        // Fallback to Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const geminiResponse = await result.response;
        response = geminiResponse.text();
        if (!response) throw new Error('No content from Gemini');
      } catch (geminiError) {
        // In development, return sample response when AI services fail
        if (process.env.NODE_ENV === 'development') {
          return NextResponse.json({ 
            data: getSampleResponse(plantName, scientificName, question)
          });
        }
        
        return NextResponse.json(
          { 
            error: 'AI service unavailable',
            details: 'Failed to generate response from AI providers'
          }, 
          { status: 503 }
        );
      }
    }

    // Ensure we have a response
    if (!response) {
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({ 
          data: getSampleResponse(plantName, scientificName, question)
        });
      }
      
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: response });
  } catch (error: any) {
    // In development, return sample response for any error
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        data: getSampleResponse(plantName, scientificName, question)
      });
    }

    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error.message
      }, 
      { status: 500 }
    );
  }
} 