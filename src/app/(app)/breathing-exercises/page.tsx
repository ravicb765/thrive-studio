
import { BreathingTool } from "@/components/features/breathing-exercises/breathing-tool";

export default function BreathingExercisesPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Mindful Breathing Techniques</h1>
        <p className="mt-2 text-lg text-foreground/80">
          Explore guided breathing exercises like Circle and Box breathing to find your calm.
        </p>
      </header>
      <BreathingTool />
    </div>
  );
}
