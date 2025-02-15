import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Recipe } from '@/models/Recipe';
import { sampleRecipes } from '@/lib/recipe-data';

// Initialize the API clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { userId, symptoms, conditions, allergies, preferences } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (!symptoms && !conditions) {
      return NextResponse.json(
        { error: 'Please provide either symptoms or conditions' },
        { status: 400 }
      );
    }

    // Construct the prompt
    const prompt = `Generate 3 medicinal herbal recipes based on the following requirements:
      ${symptoms ? `Symptoms: ${symptoms}` : ''}
      ${conditions ? `Medical Conditions: ${conditions}` : ''}
      ${allergies ? `Allergies/Sensitivities: ${allergies}` : ''}
      ${preferences ? `Preferences: ${preferences}` : ''}

      For each recipe, provide:
      1. Name
      2. List of ingredients
      3. Step-by-step instructions
      4. Health benefits
      5. Any warnings or contraindications

      Format the response as a JSON array of recipes.`;

    let recipes;

    try {
      // Try OpenAI first
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4",
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error('No content from OpenAI');
      
      recipes = JSON.parse(content);
    } catch (openaiError) {
      console.error('OpenAI Error:', openaiError);

      try {
        // Fallback to Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const content = response.text();
        
        recipes = JSON.parse(content);
      } catch (geminiError) {
        console.error('Gemini Error:', geminiError);
        
        // Fallback to sample recipes if both APIs fail
        recipes = sampleRecipes.slice(0, 3).map(recipe => ({
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          benefits: recipe.benefits,
          warnings: recipe.warnings || []
        }));
      }
    }

    // Ensure recipes is an array and has the correct format
    if (!Array.isArray(recipes)) {
      recipes = [recipes];
    }

    // Format recipes to match the Recipe model
    const formattedRecipes = recipes.map(recipe => ({
      userId,
      name: recipe.name,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients],
      instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions],
      benefits: Array.isArray(recipe.benefits) ? recipe.benefits : [recipe.benefits],
      warnings: Array.isArray(recipe.warnings) ? recipe.warnings : recipe.warnings ? [recipe.warnings] : [],
      symptoms,
      conditions,
      allergies,
      preferences
    }));

    return NextResponse.json({ recipes: formattedRecipes });
  } catch (error: any) {
    console.error('Recipe generation error:', error);
    return NextResponse.json(
      { 
        error: 'Recipe generation failed',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

// GET method to check service health
export async function GET() {
  return NextResponse.json({ status: 'Recipe generation service is running' });
}