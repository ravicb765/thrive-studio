import { ExerciseForm } from "@/components/features/alliterative-exercise/exercise-form";

export default function AlliterativeExercisePage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Alliterative Exercise Fun</h1>
        <p className="mt-2 text-lg text-foreground/80">
          Unleash creativity with exercises that play with words and movements!
        </p>
      </header>
      <ExerciseForm />
    </div>
  );
}
