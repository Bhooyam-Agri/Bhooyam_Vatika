'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen gradient-page gradient-dark">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative py-24 gradient-hero">
          <div className="absolute top-10 right-10">
            <img
              src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80"
              alt="Animated hydroponic plant"
              className="w-20 h-20 animate-slowly-spin"
              style={{ transform: `scale(${1 + scrollPos / 500})` }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-primary-foreground">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Revolutionizing Agriculture Through Technology
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                At Bhooyam, we&apos;re passionate about making sustainable farming accessible to everyone through innovative hydroponic solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe in a future where fresh, nutritious food is available to everyone, regardless of their location or climate. Our mission is to empower individuals and businesses with the tools and knowledge they need to grow their own food sustainably.
                </p>
                <ul className="space-y-4">
                  {[
                    'Reduce water consumption in agriculture by 90%',
                    'Make fresh produce accessible year-round',
                    'Empower local food production',
                    'Minimize environmental impact',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="h-5 w-5 text-primary mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80"
                  alt="Hydroponic farm"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the experts behind Bhooyam's innovative hydroponic solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dr. Sarah Chen',
                  role: 'Chief Technology Officer',
                  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
                  bio: 'Ph.D. in Agricultural Engineering with 15+ years experience in hydroponics.',
                },
                {
                  name: 'Michael Rodriguez',
                  role: 'Head of Product Development',
                  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
                  bio: 'Expert in sustainable farming systems and IoT integration.',
                },
                {
                  name: 'Emma Thompson',
                  role: 'Agricultural Scientist',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
                  bio: 'Specializes in plant nutrition and hydroponic growing techniques.',
                },
              ].map((member) => (
                <div key={member.name} className="bg-card rounded-lg shadow-md overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary mb-4">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions about our products or need expert advice? We're here to help!
                </p>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">contact@bhooyam.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">123 Innovation Drive, Tech City, TC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6 bg-muted p-8 rounded-lg">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
