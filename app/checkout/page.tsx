"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      
      if (!user) {
        router.push('/auth');
        return;
      }

      if (cart.length === 0) {
        router.push('/shop');
      }
    };

    checkAuth();
  }, [cart.length, router]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      
      if (!user) {
        router.push('/auth');
        return;
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          items: cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price_at_time: item.price
          })),
          totalAmount: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      
      // Handle successful order creation
      clearCart();
      router.push('/orders');
      
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!"
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-page gradient-dark">
      <Navigation />
      <div className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Complete Order</h2>
                <Button
                  onClick={handleCheckout}
                  disabled={loading || cart.length === 0}
                  className="w-full"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}