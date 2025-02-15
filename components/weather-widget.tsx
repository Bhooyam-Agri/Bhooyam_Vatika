"use client";

import { useEffect, useState } from 'react';
import { useWeather } from '@/lib/weather';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cloud, Droplet } from 'lucide-react';

export function WeatherWidget() {
  const { currentWeather, forecast, setLocation, location, error } = useWeather();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default to New York City coordinates if geolocation fails
          setLocation(40.7128, -74.0060);
        }
      );
    }
  }, [location, setLocation]);

  if (!mounted) {
    return null;
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <Cloud className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
          <p>Unable to load weather data.</p>
          <p className="text-sm">Please try again later.</p>
        </div>
      </Card>
    );
  }

  if (!currentWeather) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-8 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Tabs defaultValue="current">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{currentWeather.temp}°C</h3>
              <p className="text-muted-foreground capitalize">
                {currentWeather.description}
              </p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
              alt={currentWeather.description}
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Droplet className="text-blue-500" />
              <span className="text-muted-foreground">
                {currentWeather.humidity}% Humidity
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="mt-4">
          <div className="space-y-4">
            {forecast.map((day) => (
              <div
                key={day.date}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={day.description}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="font-medium">{day.date}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {day.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{day.temp}°C</p>
                  <p className="text-sm text-muted-foreground">
                    {day.humidity}% Humidity
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}