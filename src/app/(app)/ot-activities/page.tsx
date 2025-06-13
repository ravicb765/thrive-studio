
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, HeartHandshake, Hand, PersonStanding, Feather, Eye, ListChecks, 
  Settings, Zap, Edit3, CheckSquare, BarChart2, Tv, Film, SlidersHorizontal, UserCog
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

const otTaskCategories = [
  {
    title: "Self-Care / Activities of Daily Living (ADLs)",
    icon: HeartHandshake,
    goal: "Follow visual sequences for daily routines like brushing teeth, washing hands, and dressing.",
    examples: [
      "Brush teeth (with steps): get toothbrush → apply paste → brush → rinse.",
      "Wash hands: Wet → Soap → Rub → Rinse → Dry (animated guide).",
      "Put on socks/shoes: Step-by-step dressing practice."
    ],
    dataAiHint: "hygiene routine checklist"
  },
  {
    title: "Fine Motor Skills",
    icon: Hand,
    goal: "Develop hand strength and coordination through activities like tracing, buttoning, and cutting.",
    examples: [
      "Trace lines/shapes using finger or stylus on screen.",
      "Button a shirt (visual guide).",
      "Open and close zipper (matching game or real-world practice)."
    ],
    dataAiHint: "tracing drawing handcraft"
  },
  {
    title: "Gross Motor Skills",
    icon: PersonStanding,
    goal: "Enhance body awareness, balance, and coordination with fun movements and poses.",
    examples: [
      "Jump 5 times with music beat.",
      "Balance on one foot (use visual timer).",
      "Animal walks (bear, crab) - follow video."
    ],
    dataAiHint: "jumping balance exercise"
  },
  {
    title: "Sensory Regulation Activities",
    icon: Feather, // Using Feather for gentle sensory, Waves could also work
    goal: "Engage in calming or alerting sensory inputs to help manage tension and improve focus.",
    examples: [
      "Press soft ball 10 times.",
      "Play with putty or dough.",
      "Listen to calm sound (auditory sensory break)."
    ],
    dataAiHint: "sensory play calm"
  },
  {
    title: "Visual Perception & Cognitive OT Tasks",
    icon: Eye,
    goal: "Strengthen visual processing skills like matching, sorting, and pattern recognition.",
    examples: [
      "Match shape to outline (visual matching game).",
      "Find the missing puzzle piece.",
      "Sort objects by size (visual discrimination)."
    ],
    dataAiHint: "puzzle shapes matching"
  },
  {
    title: "Executive Function & Daily Routines",
    icon: ListChecks,
    goal: "Improve planning, sequencing, impulse control, and organization for daily tasks.",
    examples: [
      "Complete a morning checklist: Wake up → toilet → dress → breakfast.",
      "Pack school bag with 3 items.",
      "Wait 1 minute with timer (impulse control)."
    ],
    dataAiHint: "planning checklist routine"
  }
];

const appFeatures = [
    { name: "Visual Step-by-Step Guides", icon: Tv, description: "Clear, sequential instructions with optional audio narration." },
    { name: "Video Modeling & Animations", icon: Film, description: "Demonstrations of tasks by real people or engaging animations." },
    { name: "Repeatable Routines", icon: CheckSquare, description: "Set tasks to appear daily, weekly, or as needed." },
    { name: "Progress Tracking", icon: BarChart2, description: "Monitor task streaks, mastery levels, and overall improvement." },
    { name: "Sensory Mode Adjustments", icon: SlidersHorizontal, description: "Customize brightness, sound levels, and haptic feedback." },
];

export default function OTActivitiesPage() {
  const { userProfile } = useAuth();
  const isParentTeacher = userProfile?.role === 'parent_teacher';

  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <ClipboardList className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">Occupational Therapy & Daily Skills</h1>
        <p className="mt-2 text-lg text-foreground/80 max-w-3xl mx-auto">
          Explore a variety of Occupational Therapy (OT) tasks designed to build independence in daily living, enhance motor skills, support sensory regulation, and improve cognitive abilities.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {otTaskCategories.map((category) => (
          <Card key={category.title} className="shadow-lg flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <category.icon className="h-8 w-8 text-accent" />
                <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
              </div>
              <CardDescription>{category.goal}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50">
                <Image
                  src={`https://placehold.co/400x225.png`}
                  alt={`${category.title} illustration`}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                  data-ai-hint={category.dataAiHint}
                />
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90 pl-4">
                {category.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Interactive guides, video models, and progress tracking coming soon!
              </p>
            </CardContent>
            <div className="p-4 pt-0">
              <Button disabled className="w-full">
                Explore {category.title.split(" ")[0]} Tasks (Coming Soon)
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-12 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl">App Features to Support OT Tasks</CardTitle>
          </div>
          <CardDescription>
            Our app aims to enhance the OT experience with these supportive features:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appFeatures.map((feature) => (
            <div key={feature.name} className="flex items-start gap-3 p-3 bg-card-foreground/5 rounded-md">
              <feature.icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-md text-foreground">{feature.name}</h4>
                <p className="text-sm text-foreground/80">{feature.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {isParentTeacher && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <UserCog className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-2xl">OT Task Management (Parent/Therapist Tools)</CardTitle>
            </div>
            <CardDescription>
              Customize and track OT activities for each child. This section will empower you to tailor the therapeutic experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50">
              <Image
                src="https://placehold.co/600x300.png"
                alt="Admin tools for OT tasks illustration"
                width={600}
                height={300}
                className="object-cover w-full h-full"
                data-ai-hint="planning tasks checklist data"
              />
            </div>
            <p className="mb-4 text-foreground/90">
              Future administrative features for this OT module will include:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Add new OT tasks with custom images or video links.</li>
                <li>Assign tasks to a child's schedule (e.g., daily, 3x/week, specific days).</li>
                <li>Track success attempts (e.g., ✔️/✖️, prompted, independent, or a 1–5 rating scale).</li>
                <li>View progress over time, possibly with visual charts or a calendar view.</li>
                <li>Export progress reports for documentation or sharing with therapists.</li>
              </ul>
            </p>
            <Button disabled className="w-full md:w-auto">
              <Edit3 className="mr-2 h-4 w-4" />
              Manage Custom OT Tasks (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
