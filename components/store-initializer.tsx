import { useEffect } from 'react';
import { usePlantsStore } from '@/lib/plants';

export function StoreInitializer() {
  const initializePlants = usePlantsStore(state => state.initializePlants);

  useEffect(() => {
    initializePlants();
  }, [initializePlants]);

  return null;
}