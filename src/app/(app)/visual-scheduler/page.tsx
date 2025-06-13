import { SchedulerBoard } from "@/components/features/visual-scheduler/scheduler-board";

export default function VisualSchedulerPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Visual Scheduler</h1>
        <p className="mt-2 text-lg text-foreground/80">
          Plan your day with our easy-to-use First-Then board.
        </p>
      </header>
      <SchedulerBoard />
    </div>
  );
}
