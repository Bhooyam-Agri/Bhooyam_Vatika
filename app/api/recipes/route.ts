import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Recipe } from '@/models/Recipe';

// GET endpoint to fetch user's recipes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const recipes = await Recipe.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(recipes);
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

// POST endpoint to save a new recipe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, recipes, symptoms, conditions, allergies, preferences } = body;

    if (!userId || !recipes || !Array.isArray(recipes)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const savedRecipes = await Promise.all(
      recipes.map(recipe => 
        Recipe.create({
          userId,
          ...recipe,
          symptoms,
          conditions,
          allergies,
          preferences
        })
      )
    );

    return NextResponse.json({ recipes: savedRecipes });
  } catch (error: any) {
    console.error('Error saving recipes:', error);
    return NextResponse.json(
      { error: 'Failed to save recipes' },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update recipe bookmark status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipeId, isBookmarked } = body;

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { isBookmarked, updatedAt: new Date() },
      { new: true }
    );

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error: any) {
    console.error('Error updating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to update recipe' },
      { status: 500 }
    );
  }
} 