import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false // Only use this if you're handling the API key securely
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateWithOpenAI(prompt: string) {
  try {
    console.log('Attempting OpenAI generation with prompt:', prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable herbalist specializing in medicinal plant recipes and information."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
     
    });
    
    if (!response.choices[0].message.content) {
      throw new Error('No response from OpenAI');
    }

    const content = response.choices[0].message.content;
    console.log('OpenAI response:', content);
    
    return JSON.parse(content);
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    throw new Error(`OpenAI generation failed: ${error.message}`);
  }
}

export async function generateWithGemini(prompt: string) {
  try {
    console.log('Attempting Gemini generation with prompt:', prompt);
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const enhancedPrompt = `You are a knowledgeable herbalist. Generate exactly one medicinal recipe as a JSON object without any additional text. The response must be valid JSON that can be parsed. Use this exact format:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "instructions": ["step 1", "step 2"],
      "benefits": ["benefit 1", "benefit 2"],
      "warnings": ["warning 1", "warning 2"]
    }
  ]
}

For these requirements:
${prompt}

Remember: Return ONLY the JSON object, no other text.`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();
    console.log('Gemini raw response:', text);
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.log('Attempting to extract JSON from Gemini response');
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to generate valid recipe format');
      }
      try {
        const extracted = JSON.parse(jsonMatch[0]);
        console.log('Successfully extracted JSON:', extracted);
        return extracted;
      } catch (e) {
        throw new Error('Failed to parse recipe response');
      }
    }
  } catch (error: any) {
    console.error('Gemini Error:', error);
    throw new Error(`Gemini generation failed: ${error.message}`);
  }
}

export async function generatePlantContent(prompt: string) {
  try {
    return await generateWithOpenAI(prompt);
  } catch (error) {
    return await generateWithGemini(prompt);
  }
}

export async function getPlantDetails(plantName: string, scientificName: string) {
  const prompt = `Please provide detailed information about ${plantName} (${scientificName}) in this exact JSON format:
  {
    "traditionalUses": ["use1", "use2"],
    "scientificResearch": ["finding1", "finding2"],
    "preparation": {
      "methods": ["method1", "method2"],
      "dosage": "dosage information",
      "precautions": ["precaution1", "precaution2"]
    },
    "interactions": ["interaction1", "interaction2"],
    "historicalUse": "brief history",
    "modernApplications": ["application1", "application2"]
  }`;

  return generateWithOpenAI(prompt);
}

export async function getPlantRecipe(plantName: string, scientificName: string) {
  const prompt = `Create a medicinal recipe for ${plantName} (${scientificName}) in this exact JSON format:
  {
    "name": "Recipe Name",
    "description": "Brief description",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": ["step1", "step2"],
    "benefits": ["benefit1", "benefit2"],
    "warnings": ["warning1", "warning2"],
    "dosage": "dosage information"
  }`;

  return generateWithOpenAI(prompt);
}

export async function getPlantQA(plantName: string, scientificName: string, question: string) {
  const prompt = `Answer this question about ${plantName} (${scientificName}):
  
  Question: ${question}
  
  Return the response in this exact JSON format:
  {
    "question": "${question}",
    "answer": "detailed answer",
    "sources": ["source1", "source2"],
    "additionalInfo": ["fact1", "fact2"]
  }`;

  try {
    return await generateWithOpenAI(prompt);
  } catch (error) {
    return await generateWithGemini(prompt);
  }
}

export async function generateRecipe(symptoms: string, conditions: string, allergies?: string, preferences?: string) {
  const prompt = `Generate a medicinal recipe based on the following requirements:
  ${symptoms ? `Symptoms: ${symptoms}` : ''}
  ${conditions ? `Medical Conditions: ${conditions}` : ''}
  ${allergies ? `Allergies/Sensitivities: ${allergies}` : ''}
  ${preferences ? `Preferences: ${preferences}` : ''}

  The recipe must be safe and suitable for these conditions. Include relevant warnings about potential interactions or contraindications.

  Return the response in this exact format:
  {
    "recipes": [
      {
        "name": "Recipe Name",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "instructions": ["step 1", "step 2"],
        "benefits": ["benefit 1", "benefit 2"],
        "warnings": ["warning 1", "warning 2"]
      }
    ]
  }`;

  console.log('Starting recipe generation process');
  let openAiError = null;
  let geminiError = null;

  try {
    // Try OpenAI first
    console.log('Attempting OpenAI generation');
    const response = await generateWithOpenAI(prompt);
    if (!response.recipes || !Array.isArray(response.recipes)) {
      throw new Error('Invalid recipe format received from OpenAI');
    }
    console.log('Successfully generated recipe with OpenAI');
    return response.recipes;
  } catch (error: any) {
    console.error('OpenAI generation failed:', error);
    openAiError = error;
    
    // Try Gemini as fallback
    try {
      console.log('Attempting Gemini generation as fallback');
      const response = await generateWithGemini(prompt);
      if (!response.recipes || !Array.isArray(response.recipes)) {
        throw new Error('Invalid recipe format from Gemini');
      }
      console.log('Successfully generated recipe with Gemini');
      return response.recipes;
    } catch (error: any) {
      console.error('Gemini generation failed:', error);
      geminiError = error;
      throw new Error(`Recipe generation failed. OpenAI Error: ${openAiError.message}. Gemini Error: ${error.message}`);
    }
  }
}

export async function getPlantInsights(plant: { name: string; scientificName: string }) {
  const prompt = `Provide insights about ${plant.name} (${plant.scientificName}) in this exact JSON format:
  {
    "traditionalUses": ["use1", "use2"],
    "scientificResearch": ["finding1", "finding2"],
    "preparation": {
      "methods": ["method1", "method2"],
      "dosage": "dosage information",
      "precautions": ["precaution1", "precaution2"]
    },
    "interactions": ["interaction1", "interaction2"],
    "historicalUse": "brief history",
    "modernApplications": ["application1", "application2"]
  }`;

  try {
    return await generateWithOpenAI(prompt);
  } catch (error) {
    return await generateWithGemini(prompt);
  }
}
