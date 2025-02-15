import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';

interface FeatureCardProps {
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({ title, description, index = 0 }: FeatureCardProps) {
  return (
    <RevealOnScroll delay={index * 100}>
      <div className="group p-8 rounded-2xl bg-background/50 hover:bg-background transition-colors duration-300 border border-border/50 glow-hover">
        <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </RevealOnScroll>
  );
}