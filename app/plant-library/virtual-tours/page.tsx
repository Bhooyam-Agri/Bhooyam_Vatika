'use client';

// This file now only serves as a redirect to the consolidated virtual tours page
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlantLibraryVirtualToursRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/vatika/virtual-tours');
  }, [router]);

  return null;
}