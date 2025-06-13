
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Puzzle, Edit3, MessageSquare, UserCheck, HeartHandshake, Zap, BookOpen, Lightbulb, Users2, ShieldCheck, ListChecks, FileText, Handshake, Volume2, Gamepad2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

const abaTaskCategories = [
  {
    title: "Discrete Trial Training (DTT) Tasks",
    icon: Zap,
    goal: "Break skills into small parts with prompts & reinforcement. Focus on repetition and clear feedback.",
    examples: [
      "Match colors: 'Touch red', 'Point to blue'.",
      "Match common objects: 'Match spoon to spoon', 'Give me the shoe'.",
      "Follow 1-step commands: 'Clap hands', 'Stomp feet', 'Touch head'.",
      "Point to body parts: 'Where is your nose?', 'Show me your hand'.",
      "Imitate actions: Therapist claps, child imitates; waving, nodding.",
      "Respond to name: Child looks or orients when name is called."
    ],
    dataAiHint: "blocks learning colors shapes"
  },
  {
    title: "Communication Skills (Verbal Behavior / Manding)",
    icon: MessageSquare,
    goal: "Develop functional communication, requesting (manding), and expressive language.",
    examples: [
      "Request preferred item: Tap picture for 'cookie' or say 'cookie'.",
      "Use AAC/PECS: Exchange 'I want' + item card or tap 'break' icon on device.",
      "Make a choice: Between 2 visuals - 'Do you want car or blocks?'",
      "Ask for help: Say or tap a 'help' icon."
    ],
    dataAiHint: "communication speech bubble"
  },
  {
    title: "Behavior & Self-Regulation",
    icon: UserCheck,
    goal: "Improve behavioral control, emotional regulation, and waiting skills.",
    examples: [
      "Sit in chair for 2 minutes using timer or music.",
      "Wait for turn: Use a visual countdown or 'my turn' / 'your turn' cards.",
      "Follow schedule: Complete 'first-then' board activities.",
      "Raise hand before talking (if applicable to setting).",
      "Use calm-down tool: Choose breathing exercise, go to calm corner."
    ],
    dataAiHint: "calm focus timer"
  },
  {
    title: "Self-Help / Daily Living Skills",
    icon: HeartHandshake,
    goal: "Increase independence in everyday personal care and routines.",
    examples: [
      "Brush teeth: Follow visual steps (pictures/videos).",
      "Wash hands: Complete visual handwashing sequence.",
      "Get dressed: Select clothing items, follow steps for putting on.",
      "Feed self with spoon/fork: Practice during meal times.",
      "Clean up toys: Match toy to labeled container or picture."
    ],
    dataAiHint: "hygiene routine checklist"
  },
  {
    title: "Cognitive & Academic Readiness",
    icon: Lightbulb, 
    goal: "Build foundational cognitive skills for learning, such as sorting, counting, and letter/sound recognition.",
    examples: [
      "Match letter to sound: 'Find B' and say /b/.",
      "Count 1–5 objects: Touch and count pictures or items.",
      "Sort by shape or color: Drag and drop items into categories.",
      "Complete simple puzzles: 2-3 piece visual puzzles."
    ],
    dataAiHint: "learning letters numbers"
  },
  {
    title: "Social Skills",
    icon: Users2, // Or Handshake
    goal: "Enhance social interaction, understanding, and appropriate responses.",
    examples: [
      "Make eye contact: Reward when child looks up during interaction.",
      "Wave hello/goodbye: Practice at greeting station or with prompts.",
      "Say 'good morning' or other greetings.",
      "Share a toy for a short period (use timer/prompt).",
      "Take turns in a game: Use a visual spinner or verbal cues.",
      "Respond 'yes' or 'no' appropriately to questions."
    ],
    dataAiHint: "friends interaction sharing"
  }
];

export default function ArticulationGamesPage() {
  const { userProfile } = useAuth();
  const isParentTeacher = userProfile?.role === 'parent_teacher';

  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <Gamepad2 className="h-16 w-16 text-primary mx-auto mb-4" /> {/* Changed icon to Gamepad2 for "Games" */}
        <h1 className="text-4xl font-bold font-headline text-primary">ABA-Based Skill-Building Activities</h1>
        <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
          Explore tasks based on Applied Behavior Analysis (ABA) principles to build essential skills. These activities are broken down into manageable steps, reinforced with positive feedback, and designed for engaging learning experiences.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {abaTaskCategories.map((category) => (
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
              <p className="text-sm font-semibold text-foreground/90">Example Tasks:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 pl-4">
                {category.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Future tasks in this category will feature interactive picture cards, audio prompts, and star rewards.
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

      {isParentTeacher && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-2xl">Parent/Therapist Tools for Skill-Building</CardTitle>
            </div>
            <CardDescription>
              Customize and track skill-building activities for each child. This section will allow you to tailor the learning experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50">
              <Image
                src="https://placehold.co/600x300.png"
                alt="Admin tools for ABA tasks illustration"
                width={600}
                height={300}
                className="object-cover w-full h-full"
                data-ai-hint="planning tasks checklist data"
              />
            </div>
            <p className="mb-4 text-foreground/90">
              Future administrative features for this module will include:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Add custom tasks tailored to individual child needs.</li>
                <li>Set prompt levels for tasks (e.g., independent, verbal, physical).</li>
                <li>Track child responses (e.g., correct ✔️ / incorrect ✖️, prompted).</li>
                <li>Log data over time to monitor progress.</li>
                <li>Export progress summaries for therapist notes or reports.</li>
              </ul>
            </p>
            <Button disabled className="w-full md:w-auto">
              <Edit3 className="mr-2 h-4 w-4" />
              Manage Custom ABA Tasks (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
