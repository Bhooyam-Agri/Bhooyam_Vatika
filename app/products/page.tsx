import { Navigation } from '@/components/navigation';
import { ProductViewer } from '@/components/product-viewer';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  return (
    <div className="min-h-screen gradient-page gradient-dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Smart Growing Solutions
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover our innovative hydroponics systems designed for maximum efficiency and yield
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductViewer key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Bottom CTA Section */}
      <section className="py-24 bg-gradient-to-t from-secondary/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Growing?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of growers who have already revolutionized their farming with our solutions
            </p>
            <Button size="lg" className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}