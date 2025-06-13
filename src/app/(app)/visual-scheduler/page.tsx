
import { SchedulerBoard } from "@/components/features/visual-scheduler/scheduler-board";

export default function VisualSchedulerPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Visual Scheduler</h1>
        <p className="mt-2 text-lg text-foreground/80 max-w-3xl mx-auto">
          Organize your day with simple First-Then visual schedules. For instance, plan morning routines like 'First: Wake up at 6:00 AM, Then: Bathroom routine', map out parts of the day like 'First: School, Then: Playtime', or prepare for bedtime with 'First: Story Time, Then: Sleep'.
        </p>
      </header>
      <SchedulerBoard />
    </div>
  );
}

