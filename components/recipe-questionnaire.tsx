import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

interface Recipe {
  _id?: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  warnings?: string[];
  isBookmarked?: boolean;
}

interface RecipeQuestionnaireProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecipeQuestionnaire({ open, onOpenChange }: RecipeQuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    symptoms: '',
    conditions: '',
    allergies: '',
    preferences: ''
  });
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (field: keyof typeof answers) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const generateRecipes = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      
      if (!user) {
        router.push('/auth');
        return;
      }

      // Don't make the API call if no symptoms or conditions are provided
      if (!answers.symptoms.trim() && !answers.conditions.trim()) {
        toast({
          title: "Input Required",
          description: "Please provide at least some symptoms or conditions",
          variant: "destructive"
        });
        return;
      }

      // Generate recipes
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          symptoms: answers.symptoms.trim(),
          conditions: answers.conditions.trim(),
          allergies: answers.allergies.trim(),
          preferences: answers.preferences.trim()
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate recipes');
      }

      const data = await response.json();
      
      if (!data.recipes || !Array.isArray(data.recipes)) {
        throw new Error('Invalid recipe data received');
      }

      setGeneratedRecipes(data.recipes);
      setStep(3);

      // Save recipes to database
      const saveResponse = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          recipes: data.recipes,
          symptoms: answers.symptoms,
          conditions: answers.conditions,
          allergies: answers.allergies,
          preferences: answers.preferences
        }),
      });

      if (!saveResponse.ok) {
        console.error('Failed to save recipes:', await saveResponse.json());
        toast({
          title: "Warning",
          description: "Recipes generated but failed to save. You can try saving them later.",
          variant: "destructive"
        });
      }

      toast({
        title: "Success",
        description: "Recipes generated successfully!"
      });
    } catch (error: any) {
      console.error('Error generating recipes:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate recipes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (recipe: Recipe) => {
    try {
      const user = auth.currentUser;
      if (!user || !recipe._id) return;

      const response = await fetch('/api/recipes', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId: recipe._id,
          isBookmarked: !recipe.isBookmarked
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bookmark');
      }

      const updatedRecipe = await response.json();
      setGeneratedRecipes(prev => 
        prev.map(r => r._id === recipe._id ? updatedRecipe : r)
      );

      toast({
        title: updatedRecipe.isBookmarked ? "Recipe Bookmarked" : "Bookmark Removed",
        description: updatedRecipe.isBookmarked 
          ? "Recipe has been added to your bookmarks" 
          : "Recipe has been removed from your bookmarks"
      });
    } catch (error: any) {
      console.error('Error updating bookmark:', error);
      toast({
        title: "Bookmark Update Failed",
        description: error.message || "Failed to update bookmark status",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] max-h-[85vh] w-[90vw] overflow-y-auto bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>Personalized Medicinal Recipes</DialogTitle>
          <DialogDescription>
            Let&apos;s find the perfect medicinal recipes for your health needs
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  What symptoms or health concerns are you experiencing?
                </label>
                <Textarea
                  placeholder="E.g., headaches, joint pain, digestive issues..."
                  value={answers.symptoms}
                  onChange={handleInputChange('symptoms')}
                  className="h-24"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Do you have any existing medical conditions?
                </label>
                <Textarea
                  placeholder="E.g., diabetes, high blood pressure..."
                  value={answers.conditions}
                  onChange={handleInputChange('conditions')}
                  className="h-24"
                />
              </div>
              <Button 
                onClick={() => setStep(2)} 
                className="w-full"
                disabled={!answers.symptoms && !answers.conditions}
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Do you have any allergies or sensitivities?
                </label>
                <Textarea
                  placeholder="E.g., nuts, dairy, specific herbs..."
                  value={answers.allergies}
                  onChange={handleInputChange('allergies')}
                  className="h-24"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Any dietary preferences or restrictions?
                </label>
                <Textarea
                  placeholder="E.g., vegetarian, no spicy foods..."
                  value={answers.preferences}
                  onChange={handleInputChange('preferences')}
                  className="h-24"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                  Back
                </Button>
                <Button onClick={generateRecipes} disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Recipes...
                    </>
                  ) : (
                    'Generate Recipes'
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {generatedRecipes.length > 0 ? (
                <>
                  <div className="grid gap-6">
                    {generatedRecipes.map((recipe) => (
                      <Card key={recipe._id} className="p-6 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-4 right-4"
                          onClick={() => handleBookmark(recipe)}
                        >
                          {recipe.isBookmarked ? (
                            <BookmarkCheck className="h-5 w-5" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </Button>

                        <h3 className="text-lg font-semibold mb-3">{recipe.name}</h3>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Benefits:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {recipe.benefits.map((benefit, i) => (
                              <li key={i} className="text-muted-foreground">{benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Ingredients:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {recipe.ingredients.map((ingredient, i) => (
                              <li key={i} className="text-muted-foreground">{ingredient}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Instructions:</h4>
                          <ol className="list-decimal pl-5 space-y-1">
                            {recipe.instructions.map((instruction, i) => (
                              <li key={i} className="text-muted-foreground">{instruction}</li>
                            ))}
                          </ol>
                        </div>

                        {recipe.warnings && recipe.warnings.length > 0 && (
                          <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg">
                            <h4 className="font-medium mb-2 text-yellow-500">Warnings:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {recipe.warnings.map((warning, i) => (
                                <li key={i} className="text-yellow-500">{warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                  
                  <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                    Start Over
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">No recipes found. Please try again with different requirements.</p>
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Start Over
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}