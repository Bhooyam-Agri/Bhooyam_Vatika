"use client";

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { auth } from '@/lib/firebase';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  items: Array<{
    product_id: string;
    quantity: number;
    price_at_time: number;
  }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      
      if (!user) {
        router.push('/auth');
        return;
      }

      try {
        const response = await fetch(`/api/orders?userId=${user.uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-page gradient-dark">
        <Navigation />
        <div className="pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-page gradient-dark">
      <Navigation />
      <div className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
          
          {orders.length === 0 ? (
            <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order placed{' '}
                        {format(new Date(order.created_at), 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Order #{order.id.slice(0, 8)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        Total: ${order.total_amount.toFixed(2)}
                      </p>
                      <p className={`text-sm ${
                        order.status === 'completed'
                          ? 'text-green-600'
                          : 'text-orange-500'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.product_id} × {item.quantity}
                          </span>
                          <span>
                            ${(item.price_at_time * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}