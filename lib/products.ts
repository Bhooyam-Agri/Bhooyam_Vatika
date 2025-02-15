export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
}

export const products: Product[] = [
  {
    id: 'bh-nft-4',
    name: 'Bhooyam NFT-4 System',
    description: 'Professional NFT (Nutrient Film Technique) system with 4 growing channels. Perfect for leafy greens and herbs.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80',
    category: 'systems',
    features: [
      'Supports up to 24 plants',
      'Automated nutrient delivery',
      'Built-in water level sensors',
      'Energy-efficient pump system',
      'UV-resistant materials'
    ],
    specifications: {
      'Dimensions': '180 x 60 x 100 cm',
      'Tank Capacity': '40 L',
      'Power Consumption': '45W',
      'Flow Rate': '2 L/min',
      'Material': 'Food-grade PVC'
    },
    stock: 15
  },
  {
    id: 'bh-dwc-6',
    name: 'Deep Water Culture System',
    description: 'Advanced 6-bucket DWC system for larger plants like tomatoes and peppers.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1585444744772-5e9da5df3c97?auto=format&fit=crop&q=80',
    category: 'systems',
    features: [
      '6 x 20L buckets included',
      'Commercial grade air pump',
      'Premium air stones',
      'Expandable design',
      'Complete nutrient starter kit'
    ],
    specifications: {
      'Bucket Size': '20 L each',
      'Air Pump Output': '25 L/min',
      'System Weight': '12 kg',
      'Growing Media': 'Net pots & clay pebbles included',
      'Max Plant Height': '200 cm'
    },
    stock: 8
  },
  {
    id: 'bh-nutrient-pro',
    name: 'Professional Nutrient Kit',
    description: 'Complete 3-part nutrient solution for professional hydroponic growing.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1611587266391-13e7b4e0dd43?auto=format&fit=crop&q=80',
    category: 'nutrients',
    features: [
      'Balanced NPK ratio',
      'Enhanced micronutrients',
      'pH balanced formula',
      'Suitable for all growth stages',
      'OMRI listed organic components'
    ],
    specifications: {
      'Package Size': '3 x 1L',
      'Concentration': '1000 ppm',
      'pH Range': '5.5-6.5',
      'Shelf Life': '2 years',
      'Usage Rate': '2-3 ml/L'
    },
    stock: 50
  },
  {
    id: 'bh-smart-monitor',
    name: 'Smart Nutrient Monitor',
    description: 'WiFi-enabled nutrient and pH monitoring system with mobile app integration.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1580508174046-170816f65662?auto=format&fit=crop&q=80',
    category: 'sensors',
    features: [
      'Real-time pH monitoring',
      'EC/TDS measurement',
      'Temperature sensing',
      'Mobile notifications',
      'Historical data tracking'
    ],
    specifications: {
      'Battery Life': '6 months',
      'Wireless Range': '30m',
      'Accuracy': '±0.1 pH, ±2% EC',
      'Data Storage': 'Cloud-based',
      'App Compatibility': 'iOS & Android'
    },
    stock: 25
  },
  {
    id: 'bh-led-grow-4000',
    name: 'LED Grow Light 4000W',
    description: 'Professional full-spectrum LED grow light with Samsung diodes.',
    price: 849.99,
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80',
    category: 'lighting',
    features: [
      'Samsung LM301H diodes',
      'Full spectrum output',
      'Daisy chain support',
      'Dimming capability',
      'Passive cooling system'
    ],
    specifications: {
      'Power Draw': '400W',
      'PPF': '1128 μmol/s',
      'Coverage': '5x5 ft',
      'Lifespan': '50,000 hours',
      'Dimming Range': '0-100%'
    },
    stock: 10
  }
];

export const categories = [
  { id: 'systems', name: 'Growing Systems', description: 'Complete hydroponic growing solutions' },
  { id: 'nutrients', name: 'Nutrients', description: 'Professional grade nutrients and supplements' },
  { id: 'accessories', name: 'Accessories', description: 'Essential growing accessories and equipment' },
  { id: 'sensors', name: 'Sensors & Automation', description: 'Smart monitoring and automation tools' }
];