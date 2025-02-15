"use client";

import { useEffect, useState } from 'react';
import { Droplet, Wind } from 'lucide-react';

interface EcoMetrics {
  waterSaved: number;  // in liters
  co2Reduced: number;  // in kg
}

interface EcoImpactProps {
  productId?: string;
  showTotal?: boolean;
}

export function EcoImpact({ productId, showTotal = false }: EcoImpactProps) {
  const [metrics, setMetrics] = useState<EcoMetrics>({ waterSaved: 0, co2Reduced: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (showTotal) {
      setMetrics({
        waterSaved: 1250000, // 1.25M liters
        co2Reduced: 75000,   // 75 tonnes
      });
    } else {
      const baseWaterSaving = 2000; // 2000L per month
      const baseCO2Reduction = 120;  // 120kg per month
      
      setMetrics({
        waterSaved: baseWaterSaving,
        co2Reduced: baseCO2Reduction,
      });
    }
  }, [showTotal, productId]);

  if (!mounted) return null;

  return (
    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">
        {showTotal ? 'Our Environmental Impact' : 'Environmental Benefits'}
      </h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <Droplet className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-foreground">
            <span className="font-semibold">
              {metrics.waterSaved.toLocaleString()}L
            </span>
            {' '}water saved
            {showTotal ? ' across all systems' : ' per month'}
          </span>
        </div>
        <div className="flex items-center">
          <Wind className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-foreground">
            <span className="font-semibold">
              {metrics.co2Reduced.toLocaleString()}kg
            </span>
            {' '}CO₂ emissions reduced
            {showTotal ? ' and counting' : ' per month'}
          </span>
        </div>
      </div>
    </div>
  );
}