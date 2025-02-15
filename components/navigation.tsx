"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { CartSheet } from './cart-sheet';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { ProfileMenu } from '@/components/profile-menu';

const menuItems = [
  { href: '/vatika', label: 'Vatika' },
  { href: '/products', label: 'Solutions' },
  { href: '/learn', label: 'Learn' },
  { href: '/about', label: 'Company' }
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Bhooyam
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/vatika">
            <Button variant="ghost">Vatika</Button>
          </Link>
          <Link href="/learn">
            <Button variant="ghost">Learn</Button>
          </Link>
          <Link href="/products">
            <Button variant="ghost">Solutions</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <ProfileMenu />
        </div>
      </nav>
    </header>
  );
}