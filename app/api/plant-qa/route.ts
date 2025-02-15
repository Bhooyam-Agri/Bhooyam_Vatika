import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Add this at the top of the file to debug
console.log('API Keys:', {
  openai: process.env.OPENAI_API_KEY?.slice(0, 10) + '...',
  gemini: process.env.GEMINI_API_KEY?.slice(0, 10) + '...'
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const getSampleResponse = (plantName: string, scientificName: string, question: string) => {
  // Create more specific sample responses based on common question types
  if (question.toLowerCase().includes('how to use')) {
    return `Here's how to use ${plantName} (${scientificName}):

1. Common Methods of Use:
   - As a powder or capsule supplement
   - In tea or infusions
   - Applied topically as a paste
   - Added to food and beverages

2. Recommended Usage:
   - Start with small doses and gradually increase
   - Follow package instructions for supplements
   - For tea: Use 1-2 teaspoons per cup of hot water
   - For topical use: Mix with water or carrier oil to form a paste

3. Important Precautions:
   - Consult your healthcare provider before use
   - Start with small amounts to test for sensitivity
   - Not recommended for [specific contraindications]
   - May interact with certain medications

Note: This is a general guide. Please consult a healthcare professional for personalized advice.`;
  }

  if (question.toLowerCase().includes('benefits') || question.toLowerCase().includes('good for')) {
    return `Benefits of ${plantName} (${scientificName}):

1. Key Medicinal Properties:
   - [Specific property 1]
   - [Specific property 2]
   - [Specific property 3]

2. Traditional Uses:
   - [Traditional use 1]
   - [Traditional use 2]
   - [Traditional use 3]

3. Scientific Evidence:
   - [Research finding 1]
   - [Research finding 2]

4. Safety Profile:
   - Generally considered safe when used appropriately
   - Some people may experience [common side effects]
   - Consult healthcare provider before use

Note: These benefits are based on traditional use and available research. Individual results may vary.`;
  }

  // Default response for other types of questions
  return `Information about ${plantName} (${scientificName}) regarding "${question}":

1. Relevant Properties:
   - [Property relevant to question]
   - [Other relevant properties]

2. Scientific Background:
   - [Relevant research or evidence]
   - [Additional context]

3. Practical Information:
   - [Practical answer to the question]
   - [Additional relevant details]

4. Safety Considerations:
   - [Relevant precautions]
   - [Important warnings]

Please consult a healthcare professional for personalized medical advice.`;
};

export async function POST(req: NextRequest) {
  try {
    const { plantName, scientificName, question, type, context } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    let prompt;
    if (context?.condition) {
      prompt = `As an expert herbalist and medical professional, provide a detailed, personalized response to help with ${context.condition}. The user asks: "${question}"

Available medicinal plants and their properties:
${context.plants.map(p => `- ${p.name} (${p.scientificName}):
  • Primary Uses: ${p.uses.join(', ')}
  • Traditional Applications: ${p.conditions.join(', ')}`).join('\n')}

Structure your response as follows:

1. IMMEDIATE RECOMMENDATIONS:
   - List 2-3 most effective plants specifically for their situation
   - Explain why these particular plants are best suited for their needs

2. DETAILED USAGE INSTRUCTIONS:
   For each recommended plant:
   - Specific preparation methods (e.g., exact measurements, water temperature, steeping time)
   - Precise dosage guidelines (frequency, timing, duration)
   - Best form of consumption (tea, tincture, capsule, etc.)
   - Optimal time of day to use

3. SYNERGISTIC COMBINATIONS:
   - If applicable, explain how to combine these plants effectively
   - Provide specific ratios and preparation methods for combinations

4. LIFESTYLE INTEGRATION:
   - Practical tips for incorporating these remedies into daily routine
   - Complementary practices to enhance effectiveness
   - What to avoid while using these remedies

5. EXPECTED OUTCOMES:
   - Realistic timeframe for noticing effects
   - Signs of effectiveness to look for
   - How to track progress

6. SAFETY PROTOCOL:
   - Specific contraindications for each recommended plant
   - Potential interactions with medications
   - Warning signs to watch for
   - When to seek professional medical help

Make your response practical, specific, and actionable. Avoid generic advice. Focus on providing precise, measurable recommendations that directly address the user's question.`;
    } else {
      prompt = `As an expert herbalist and medical professional, provide a detailed response about ${plantName} (${scientificName}) addressing this specific question: "${question}"

Structure your response as follows:

1. DIRECT ANSWER:
   - Provide a clear, specific answer to the question
   - Include relevant scientific evidence or research findings

2. PRACTICAL APPLICATION:
   - Exact preparation methods (measurements, temperatures, times)
   - Specific dosage guidelines (amount, frequency, duration)
   - Best form of consumption for this particular use
   - Step-by-step instructions if relevant

3. OPTIMAL USAGE:
   - Best time of day to use
   - How to maximize effectiveness
   - What to combine with or avoid
   - How to store and preserve

4. EXPECTED RESULTS:
   - Realistic timeframe for effects
   - Signs that it's working
   - Normal variations in response
   - When to adjust usage

5. SAFETY GUIDELINES:
   - Specific contraindications
   - Drug interactions
   - Maximum safe duration of use
   - Warning signs to watch for

Focus on being precise and practical. Provide exact measurements and clear instructions rather than general guidelines.`;
    }

    let response;
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a knowledgeable herbalist and medical expert. Provide specific, practical answers based on scientific evidence. Always include relevant safety information."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      response = completion.choices[0].message.content;
    } catch (openaiError) {
      console.error('OpenAI error:', openaiError);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        if (!text) throw new Error('No content from Gemini');
        response = text;
      } catch (geminiError) {
        console.error('Gemini error:', geminiError);
        response = context?.condition 
          ? `Specific guidance for treating ${context.condition}:

1. Recommended Plants:
${context.plants.map(p => `   - ${p.name} (${p.scientificName})
     Uses: ${p.uses.join(', ')}`).join('\n')}

2. General Guidelines:
   - Start with one plant at a time to monitor effects
   - Follow recommended dosages
   - Prepare according to traditional methods
   - Monitor your response

3. Safety Precautions:
   - Consult a healthcare provider before starting
   - Watch for any adverse reactions
   - Stop use if you experience side effects
   - This advice is not a substitute for professional medical care`
          : getSampleResponse(plantName, scientificName, question);
      }
    }

    if (!response) {
      throw new Error('No response generated');
    }

    return NextResponse.json({ data: response });
  } catch (error: any) {
    console.error('Error in plant-qa:', error);
    return NextResponse.json(
      { data: "I apologize, but I'm having trouble processing your request at the moment. Please try again later." }, 
      { status: 200 }
    );
  }
} 