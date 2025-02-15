"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, Star } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductViewer } from '@/components/product-viewer';
import { EcoImpact } from '@/components/eco-impact';
import { useCart } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const cart = useCart();
  const product = products.find(p => p.id === params.id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold">Product not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    cart.addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image/3D Viewer */}
            <div className="bg-card rounded-lg overflow-hidden shadow-lg">
              <ProductViewer productId={product.id} fallbackImage={product.image} />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">(24 reviews)</span>
              </div>

              <p className="text-3xl font-bold text-foreground">${product.price}</p>
              
              <div className="prose prose-green dark:prose-invert max-w-none">
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="border-t border-border py-4">
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Eco Impact Metrics */}
              <EcoImpact productId={product.id} />

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="font-medium text-foreground">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-md border-input bg-background text-foreground"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="text-foreground font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}