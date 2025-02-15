'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Book, Leaf, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutMedicinalPlantsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <div className="fixed top-16 w-full bg-background/95 backdrop-blur-sm border-b z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/vatika">Vatika</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/vatika/about">About Medicinal Plants</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      <div className="pt-32 container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Understanding Medicinal Plants</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Discover the science, history, and proper use of medicinal plants in modern healthcare
          </p>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="science">Scientific Research</TabsTrigger>
              <TabsTrigger value="safety">Safety Guidelines</TabsTrigger>
              <TabsTrigger value="history">Historical Context</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="prose dark:prose-invert max-w-none">
                <h2>What Are Medicinal Plants?</h2>
                <p>
                  Medicinal plants are plants used in herbalism and thought to have therapeutic properties. 
                  The foundations of modern medicine can be traced back to early medicine and folk healing practices, 
                  which relied heavily on the use of medicinal plants.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                  {[
                    {
                      title: "Traditional Knowledge",
                      description: "Centuries of accumulated wisdom about plant properties",
                      icon: Book,
                      color: "bg-blue-100 dark:bg-blue-900/20"
                    },
                    {
                      title: "Natural Compounds",
                      description: "Bioactive compounds found in medicinal plants",
                      icon: Leaf,
                      color: "bg-green-100 dark:bg-green-900/20"
                    },
                    {
                      title: "Modern Research",
                      description: "Scientific validation of traditional uses",
                      icon: Leaf,
                      color: "bg-purple-100 dark:bg-purple-900/20"
                    },
                    {
                      title: "Safe Usage",
                      description: "Guidelines for proper application and dosage",
                      icon: Shield,
                      color: "bg-orange-100 dark:bg-orange-900/20"
                    }
                  ].map((item) => (
                    <div 
                      key={item.title}
                      className="bg-card rounded-lg border p-6"
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                        item.color
                      )}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>

                <h2>Key Benefits of Medicinal Plants</h2>
                <ul>
                  <li>Natural source of therapeutic compounds</li>
                  <li>Often have fewer side effects than synthetic drugs</li>
                  <li>Can be grown sustainably</li>
                  <li>Part of traditional healthcare systems worldwide</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="science">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Scientific Research & Evidence</h2>
                <p>
                  Modern scientific research continues to validate many traditional uses of medicinal plants
                  while discovering new applications through advanced analytical methods.
                </p>

                <h3>Research Methods</h3>
                <ul>
                  <li>Phytochemical analysis</li>
                  <li>In vitro studies</li>
                  <li>Clinical trials</li>
                  <li>Ethnobotanical research</li>
                </ul>

                <h3>Recent Discoveries</h3>
                <p>
                  Recent scientific studies have identified numerous compounds in medicinal plants
                  that show promising results in treating various conditions, from inflammation
                  to cognitive decline.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="safety">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Safety Guidelines</h2>
                <p>
                  While medicinal plants are natural, they must be used responsibly and with proper knowledge.
                  Understanding proper usage, dosage, and potential interactions is crucial.
                </p>

                <h3>General Safety Tips</h3>
                <ul>
                  <li>Consult healthcare providers before use</li>
                  <li>Be aware of potential allergic reactions</li>
                  <li>Follow recommended dosages</li>
                  <li>Know about potential drug interactions</li>
                  <li>Purchase from reliable sources</li>
                </ul>

                <div className="bg-muted p-6 rounded-lg my-6 not-prose">
                  <h4 className="text-lg font-semibold mb-2">Important Notice</h4>
                  <p className="text-muted-foreground">
                    The information provided is for educational purposes only and should not replace
                    professional medical advice. Always consult with qualified healthcare providers
                    regarding the use of medicinal plants.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Historical Context</h2>
                <p>
                  The use of medicinal plants dates back to prehistoric times. Every culture
                  has developed its own system of traditional medicine using local flora.
                </p>

                <h3>Traditional Medicine Systems</h3>
                <ul>
                  <li>Ayurveda (India)</li>
                  <li>Traditional Chinese Medicine</li>
                  <li>Native American Medicine</li>
                  <li>European Herbalism</li>
                </ul>

                <h3>Evolution of Plant Medicine</h3>
                <p>
                  Many modern pharmaceuticals were originally derived from plants.
                  Understanding this history helps us appreciate both traditional knowledge
                  and modern scientific approaches to medicine.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}