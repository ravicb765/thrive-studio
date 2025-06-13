import { BreathingTool } from "@/components/features/breathing-exercises/breathing-tool";

export default function BreathingExercisesPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Breathing Exercises</h1>
        <p className="mt-2 text-lg text-foreground/80">
          Find your calm with simple, guided breathing techniques.
        </p>
      </header>
      <BreathingTool />
    </div>
  );
}
