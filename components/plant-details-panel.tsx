import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Send, Leaf, BookOpen, Sprout } from 'lucide-react';
import { Plant } from '@/lib/plants';
import { searchPlantByScientificName, TreflePlantData } from '@/lib/trefle-api';
import { getPlantImageUrl } from '@/lib/image-utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

interface PlantDetailsPanelProps {
  plant: Plant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DetailedPlantInfo {
  traditionalUses: string[];
  scientificResearch: string[];
  preparation: {
    methods: string[];
    dosage: string;
    precautions: string[];
  };
  interactions: string[];
  historicalUse: string;
  modernApplications: string[];
}

interface QAItem {
  question: string;
  answer: string;
  timestamp: Date;
}

export function PlantDetailsPanel({ plant, open, onOpenChange }: PlantDetailsPanelProps) {
  const [loading, setLoading] = useState(false);
  const [detailedInfo, setDetailedInfo] = useState<DetailedPlantInfo | null>(null);
  const [question, setQuestion] = useState('');
  const [qaHistory, setQAHistory] = useState<QAItem[]>([]);

  const fetchDetailedInfo = async () => {
    if (detailedInfo) return; // Don't fetch if we already have the info
    
    setLoading(true);
    try {
      const response = await fetch('/api/plant-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: plant.name,
          scientificName: plant.scientificName,
          shortDescription: plant.shortDescription,
          primaryUses: plant.primaryUses,
          nativeRegions: plant.nativeRegions
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch plant details');
      }

      const data = await response.json();
      setDetailedInfo(data);
    } catch (error) {
      console.error('Error fetching plant details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return;

    const userQuestion = question;
    setQuestion('');
    setLoading(true);

    try {
      const response = await fetch('/api/plant-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plantName: plant.name,
          scientificName: plant.scientificName,
          question: userQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const { answer } = await response.json();
      
      setQAHistory(prev => [...prev, {
        question: userQuestion,
        answer,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Error getting answer:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed info when the panel opens
  if (open && !detailedInfo && !loading) {
    fetchDetailedInfo();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            {plant.name}
            <span className="text-lg font-normal text-muted-foreground">
              ({plant.scientificName})
            </span>
          </SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              <Leaf className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="details">
              <BookOpen className="h-4 w-4 mr-2" />
              Detailed Info
            </TabsTrigger>
            <TabsTrigger value="qa">
              <Send className="h-4 w-4 mr-2" />
              Ask Questions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square relative rounded-lg overflow-hidden mb-6">
                <Image
                  src={plant.imageUrl}
                  alt={plant.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">{plant.shortDescription}</p>
                
                <div>
                  <h3 className="font-semibold mb-2">Primary Uses</h3>
                  <div className="flex flex-wrap gap-2">
                    {plant.primaryUses.map((use, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Native Regions</h3>
                  <div className="flex flex-wrap gap-2">
                    {plant.nativeRegions.map((region, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/10 rounded-full text-sm"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : detailedInfo ? (
              <>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Traditional Uses</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {detailedInfo.traditionalUses.map((use, index) => (
                        <li key={index} className="text-muted-foreground">{use}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Scientific Research</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {detailedInfo.scientificResearch.map((research, index) => (
                        <li key={index} className="text-muted-foreground">{research}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Preparation & Usage</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Methods</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {detailedInfo.preparation.methods.map((method, index) => (
                            <li key={index} className="text-muted-foreground">{method}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Recommended Dosage</h4>
                        <p className="text-muted-foreground">{detailedInfo.preparation.dosage}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Precautions</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {detailedInfo.preparation.precautions.map((precaution, index) => (
                            <li key={index} className="text-muted-foreground">{precaution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Known Interactions</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {detailedInfo.interactions.map((interaction, index) => (
                        <li key={index} className="text-muted-foreground">{interaction}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Historical Use</h3>
                    <p className="text-muted-foreground">{detailedInfo.historicalUse}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Modern Applications</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {detailedInfo.modernApplications.map((application, index) => (
                        <li key={index} className="text-muted-foreground">{application}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Click the button below to load detailed information about this plant.</p>
                <Button onClick={fetchDetailedInfo}>
                  Load Details
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="qa" className="space-y-6">
            <div className="space-y-4">
              {qaHistory.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <p className="font-medium">Q: {item.question}</p>
                      <p className="text-muted-foreground">A: {item.answer}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask a question about this plant..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleQuestionSubmit}
                  disabled={loading || !question.trim()}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}