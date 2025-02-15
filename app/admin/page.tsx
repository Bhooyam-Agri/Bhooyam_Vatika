'use client';

import { useEffect, useState } from 'react';
import { ImportPlants } from '@/components/import-plants';

export default function AdminPage() {
  const [stats, setStats] = useState<{totalPlants: number, samplePlants: any[]}>({ totalPlants: 0, samplePlants: [] });

  const checkPlants = async () => {
    try {
      const response = await fetch('/api/check-plants');
      const data = await response.json();
      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to check plants:', error);
    }
  };

  useEffect(() => {
    checkPlants();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="space-y-6">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Plant Database</h2>
          <p className="mb-4">Total Plants: {stats.totalPlants}</p>
          <ImportPlants />
        </div>

        {stats.samplePlants.length > 0 && (
          <div className="p-4 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Sample Plants</h2>
            <ul className="space-y-2">
              {stats.samplePlants.map((plant) => (
                <li key={plant.id} className="p-2 bg-background rounded">
                  {plant.name} - {plant.scientificName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}