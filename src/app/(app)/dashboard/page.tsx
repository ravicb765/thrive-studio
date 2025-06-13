
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FEATURE_CARDS } from "@/lib/constants.tsx";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary mb-4">Welcome to Thrive Studio</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Dive into a world of fun and engaging activities! Discover tools designed to support growth, learning, and well-being in a calm and playful environment.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURE_CARDS.filter(card => !card.href.includes('disabledTrue')).map((card) => ( // Filter out disabled cards
          <Card key={card.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <card.icon className="h-8 w-8 text-accent" />
                <CardTitle className="font-headline text-2xl">{card.title}</CardTitle>
              </div>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50">
                <Image
                  src={`https://placehold.co/600x338.png`} // 16:9 aspect ratio
                  alt={card.title}
                  width={600}
                  height={338}
                  className="object-cover w-full h-full"
                  data-ai-hint={card.dataAiHint}
                />
              </div>
              <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90">
                <Link href={card.href} className="flex items-center justify-center">
                  Open {card.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
