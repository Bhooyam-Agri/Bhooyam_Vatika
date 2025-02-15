'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePlantsStore } from '@/lib/plants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Send } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VatikaPlantCard } from '@/components/vatika/VatikaPlantCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { usePlantAI } from '@/hooks/use-plant-ai';

interface ConditionDetails {
  name: string;
  description: string;
  symptoms: string[];
  recommendedPlants: {
    plantId: string;
    effectiveness: number;
    usageNotes: string;
  }[];
  precautions: string[];
  references: string[];
}

export default function ConditionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { plants } = usePlantsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [condition, setCondition] = useState<ConditionDetails | null>(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const { isLoading: isAiLoading, response: aiResponse, askAboutCondition } = usePlantAI();

  const conditionName = decodeURIComponent(params.name as string);
  
  // Get plants for this condition
  const conditionPlants = plants.filter(plant => 
    plant.conditions.includes(conditionName)
  );

  // TODO: Fetch condition details from MongoDB
  // useEffect(() => {
  //   const fetchConditionDetails = async () => {
  //     try {
  //       const response = await fetch(`/api/conditions/${conditionName}`);
  //       const data = await response.json();
  //       setCondition(data);
  //     } catch (error) {
  //       console.error('Failed to fetch condition details:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchConditionDetails();
  // }, [conditionName]);

  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    await askAboutCondition(
      conditionName,
      conditionPlants.map(p => ({
        name: p.name,
        scientificName: p.scientificName,
        uses: p.uses,
        conditions: p.conditions
      })),
      aiQuestion
    );
    setAiQuestion('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold capitalize">
              {conditionName}
            </h1>
            <p className="text-muted-foreground">
              {conditionPlants.length} recommended plant{conditionPlants.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plants">Recommended Plants</TabsTrigger>
            <TabsTrigger value="ask">Ask AI</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>About this Condition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ) : condition ? (
                  <>
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">{condition.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Common Symptoms</h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {condition.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Precautions</h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {condition.precautions.map((precaution, index) => (
                          <li key={index}>{precaution}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    Detailed information about this condition will be available soon.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plants">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conditionPlants.map((plant) => (
                <VatikaPlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ask">
            <Card>
              <CardHeader>
                <CardTitle>Ask AI about {conditionName}</CardTitle>
                <CardDescription>
                  Get personalized answers about treating {conditionName} with medicinal plants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about treatments, effectiveness, or usage..."
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                  />
                  <Button 
                    onClick={handleAskAi}
                    disabled={isAiLoading || !aiQuestion.trim()}
                  >
                    {isAiLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {aiResponse && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{aiResponse}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 