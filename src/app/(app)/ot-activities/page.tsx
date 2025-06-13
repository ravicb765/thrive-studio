
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, HeartHandshake, Hand, PersonStanding, Feather, Eye, ListChecks, 
  Settings, Zap, Edit3, CheckSquare, BarChart2, Tv, Film, SlidersHorizontal, UserCog, Utensils, SmilePlus, Puzzle, Rocket, Tooth
} from "lucide-react"; 
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

const otTaskCategories = [
  {
    title: "Self-Care / Activities of Daily Living (ADLs)",
    icon: HeartHandshake,
    goal: "Follow visual sequences for daily routines like brushing teeth, washing hands, dressing, and eating.",
    examples: [
      "Brush teeth: Visual steps for entire sequence (get brush, paste, brush all areas, rinse).",
      "Wash hands: Follow animated guide for Wet → Soap → Rub → Rinse → Dry.",
      "Get dressed: Step-by-step for putting on socks, shoes, shirt, pants.",
      "Use utensils: Practice holding and using spoon/fork with prompts.",
      "Wipe face after eating: Visual cue (e.g., picture of clean face) and routine step.",
      "Open lunchbox / snack containers: Practice fine motor skills for independence."
    ],
    dataAiHint: "hygiene routine checklist",
    interactiveExample: {
      taskName: "Brush Teeth",
      mainImage: { src: "https://placehold.co/300x180.png", alt: "Child brushing teeth", dataAiHint: "child brushing" },
      steps: [
        { label: "Get Toothbrush", image: { src: "https://placehold.co/120x90.png", alt: "Hand getting toothbrush", dataAiHint: "toothbrush hand" } },
        { label: "Apply Toothpaste", image: { src: "https://placehold.co/120x90.png", alt: "Applying toothpaste", dataAiHint: "toothpaste apply" } },
        { label: "Brush", image: { src: "https://placehold.co/120x90.png", alt: "Child brushing teeth step", dataAiHint: "brushing teeth" } },
        { label: "Rinse", image: { src: "https://placehold.co/120x90.png", alt: "Glass of water for rinsing", dataAiHint: "water rinse" } },
      ]
    }
  },
  {
    title: "Fine Motor Skills",
    icon: Hand,
    goal: "Develop hand strength, dexterity, and coordination for tasks like writing, buttoning, and cutting.",
    examples: [
      "Trace lines, shapes, and letters using finger or stylus on screen.",
      "Button a shirt or fasten snaps/buckles (visual guide & practice).",
      "Open and close zippers on clothing or bags.",
      "Cut paper with child-safe scissors along lines (simulated or parent-guided).",
      "Sort small objects: Match coins, buttons, or beads by size/color to develop pinch grip."
    ],
    dataAiHint: "tracing drawing handcraft"
  },
  {
    title: "Gross Motor Skills",
    icon: PersonStanding,
    goal: "Enhance body awareness, balance, coordination, and strength with fun movements and poses.",
    examples: [
      "Jump 5-10 times, perhaps following a music beat or visual cue.",
      "Balance on one foot for 5-10 seconds (use visual timer or 'freeze dance').",
      "Animal walks: Bear walk, crab walk, frog jump - follow video/animation.",
      "Simple yoga poses: Tree pose, Downward Dog (hold for 10-15 seconds with fun graphic).",
      "Navigate an obstacle course: Crawl under/over items (e.g., pillows, couch cushions)."
    ],
    dataAiHint: "jumping balance exercise"
  },
  {
    title: "Sensory Regulation Activities",
    icon: Feather, 
    goal: "Engage in calming or alerting sensory inputs to help manage energy levels, tension, and improve focus.",
    examples: [
      "Squeeze a soft ball or stress toy 10 times.",
      "Roll a therapy ball over legs/back (with assistance) for deep pressure.",
      "Play with putty, dough, or kinetic sand.",
      "Deep pressure hugs (e.g., 'bear hug' from parent or self-hug).",
      "Wall push-ups or chair push-ups for proprioceptive input.",
      "Listen to calming sounds (nature, soft music) or white noise for an auditory break."
    ],
    dataAiHint: "sensory play calm"
  },
  {
    title: "Visual Perception & Cognitive OT Tasks",
    icon: Eye,
    goal: "Strengthen visual processing skills like matching, sorting, pattern recognition, and spatial awareness.",
    examples: [
      "Match shape to its outline or a matching picture (visual matching game).",
      "Find the missing piece in a simple visual puzzle (visual closure).",
      "Sort objects by size, color, or category (visual discrimination).",
      "Copy a simple block pattern or LEGO construction (visual-motor integration).",
      "Left vs. right hand tapping/pointing games (bilateral coordination)."
    ],
    dataAiHint: "puzzle shapes matching"
  },
  {
    title: "Executive Function & Daily Routines",
    icon: ListChecks,
    goal: "Improve planning, sequencing, impulse control, working memory, and organization for daily tasks.",
    examples: [
      "Complete a morning/evening checklist: Visual schedule for wake up → toilet → dress → breakfast.",
      "Pack a (pretend) school bag with 3-4 items from a visual list.",
      "Wait for 1-2 minutes with a visual timer before a preferred activity (impulse control).",
      "Clean up after play: Follow a visual cue card for putting specific toys away.",
      "Follow 2-3 step instructions: e.g., 'Get your book, sit on the mat, and open to the first page.'"
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
        <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">Occupational Therapy Skill Builders</h1>
        <p className="mt-2 text-lg text-foreground/80 max-w-3xl mx-auto">
          Explore a variety of Occupational Therapy (OT) tasks designed to build independence in daily living, enhance motor skills, support sensory regulation, and improve cognitive abilities for thriving in everyday life.
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
              <p className="text-sm font-semibold text-foreground/90">Example Activities:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 pl-4">
                {category.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Interactive guides, video models, and progress tracking coming soon!
              </p>

              {category.interactiveExample && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold text-md text-primary mb-3 text-center flex items-center justify-center gap-2">
                    <Tooth className="h-5 w-5" /> 
                    Interactive Example: {category.interactiveExample.taskName}
                  </h4>
                  <div className="bg-card p-4 rounded-lg shadow-md border border-border">
                    <div className="mb-3 rounded-md overflow-hidden border">
                      <Image
                        src={category.interactiveExample.mainImage.src}
                        alt={category.interactiveExample.mainImage.alt}
                        width={300}
                        height={180}
                        className="object-cover w-full h-auto"
                        data-ai-hint={category.interactiveExample.mainImage.dataAiHint}
                      />
                    </div>
                    <h5 className="text-lg font-semibold text-center mb-3 text-foreground/90">{category.interactiveExample.taskName}</h5>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {category.interactiveExample.steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center p-2 border rounded-md bg-background shadow-sm">
                          <div className="w-full h-20 relative rounded-md overflow-hidden mb-1.5 border">
                             <Image
                                src={step.image.src}
                                alt={step.image.alt}
                                layout="fill"
                                objectFit="cover"
                                data-ai-hint={step.image.dataAiHint}
                              />
                          </div>
                          <p className="text-xs text-center text-foreground/80">{step.label}</p>
                        </div>
                      ))}
                    </div>
                    <Button disabled className="w-full bg-green-500 hover:bg-green-600 text-white">
                      <CheckSquare className="mr-2 h-5 w-5" /> DONE
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <Button disabled className="w-full">
                Explore {category.title.split(" ")[0]} Tasks (Coming Soon)
              </Button>
            </CardFooter>
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

