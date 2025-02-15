'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, Video, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <div className="min-h-screen gradient-page gradient-dark">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative py-24 gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Master Hydroponic Growing
              </h1>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                Comprehensive guides, video tutorials, and expert advice to help you succeed in hydroponic farming.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-background/10 hover:bg-background/20 border-background"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Introduction
              </Button>
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Learning Paths</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose your learning path based on your experience level and goals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Beginner Basics',
                  description: 'Learn the fundamentals of hydroponics and get started with your first system.',
                  icon: BookOpen,
                  lessons: ['Introduction to Hydroponics', 'Basic System Setup', 'Plant Nutrition Basics'],
                },
                {
                  title: 'Intermediate Growing',
                  description: 'Advanced techniques and optimization for better yields.',
                  icon: Video,
                  lessons: ['Advanced Nutrients', 'System Maintenance', 'Common Problems'],
                },
                {
                  title: 'Commercial Production',
                  description: 'Scale your operation and optimize for commercial success.',
                  icon: Download,
                  lessons: ['Commercial Systems', 'Business Planning', 'Automation'],
                },
              ].map((path) => (
                <div key={path.title} className="bg-card rounded-lg p-8 border">
                  <path.icon className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-xl font-semibold mb-4">{path.title}</h3>
                  <p className="text-muted-foreground mb-6">{path.description}</p>
                  <ul className="space-y-3 mb-6">
                    {path.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center text-sm">
                        <ArrowRight className="h-4 w-4 text-primary mr-2" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Articles */}
        <div className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Optimizing pH Levels for Maximum Yield',
                  excerpt: 'Learn how to maintain the perfect pH balance for your hydroponic system.',
                  image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80',
                  category: 'Technical Guide',
                },
                {
                  title: 'Choosing the Right Nutrients',
                  excerpt: 'A comprehensive guide to hydroponic nutrients and their applications.',
                  image: 'https://images.unsplash.com/photo-1585444744772-5e9da5df3c97?auto=format&fit=crop&q=80',
                  category: 'Nutrition',
                },
                {
                  title: 'Smart Monitoring Systems',
                  excerpt: 'How to automate your hydroponic system with smart technology.',
                  image: 'https://images.unsplash.com/photo-1580508174046-170816f65662?auto=format&fit=crop&q=80',
                  category: 'Technology',
                },
              ].map((article) => (
                <div key={article.title} className="bg-card rounded-lg overflow-hidden shadow-md border">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-sm text-primary mb-2">{article.category}</div>
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <Button variant="outline">Read More</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Video Tutorials</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch step-by-step tutorials from our hydroponic experts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Setting Up Your First NFT System',
                  duration: '15:24',
                  thumbnail: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80',
                },
                {
                  title: 'Nutrient Solution Mixing Guide',
                  duration: '12:51',
                  thumbnail: 'https://images.unsplash.com/photo-1611587266391-13e7b4e0dd43?auto=format&fit=crop&q=80',
                },
              ].map((video) => (
                <div key={video.title} className="relative group">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-16 w-16 text-background" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">{video.title}</h3>
                  <p className="text-muted-foreground">{video.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}