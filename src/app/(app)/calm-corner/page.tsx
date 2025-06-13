import { SoundButton } from "@/components/features/calm-corner/sound-button";
import { Waves, CloudRain, Music } from "lucide-react"; // Music for generic sound
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalmCornerPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <Waves className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">Calm Corner</h1>
        <p className="mt-2 text-lg text-foreground/80">
          A peaceful space to relax, listen, and find your calm.
        </p>
      </header>

      <Card className="mb-10 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">Soothing Sounds</CardTitle>
          <CardDescription>Tap a sound to listen and relax.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-4 md:gap-6 p-6">
          <SoundButton label="Ocean Waves" icon={Waves} />
          <SoundButton label="Gentle Rain" icon={CloudRain} />
          <SoundButton label="Soft Music" icon={Music} />
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">Calming Visuals</CardTitle>
          <CardDescription>Watch gentle animations to help you relax.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="aspect-video_ rounded-lg overflow-hidden bg-muted/50 border border-border">
            <Image
              src="https://placehold.co/800x450.png" // 16:9 aspect ratio
              alt="Calming animation placeholder"
              width={800}
              height={450}
              className="object-cover w-full h-full"
              data-ai-hint="calm animation peaceful"
            />
          </div>
          <p className="text-center mt-4 text-sm text-foreground/70">
            (Imagine a beautiful, slow-moving visual here!)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
