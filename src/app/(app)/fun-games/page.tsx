
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Copy, Apple, ToyBrick, Search, Brain, Puzzle as PuzzleIcon, Palette, PlayCircle } from "lucide-react";
import Image from "next/image";

const gameCategories = [
  {
    title: "Animal Matching",
    icon: Copy,
    description: "Match pairs of adorable animals. Sharpens memory and recognition skills!",
    dataAiHint: "animal pairs memory"
  },
  {
    title: "Feeding Adventures",
    icon: Apple, // Using Apple as a generic food icon
    description: "Feed hungry characters like sharks, unicorns, or robots their favorite treats! Fun for learning and interaction.",
    dataAiHint: "feeding game character"
  },
  {
    title: "Character Creator",
    icon: ToyBrick, // Icon suggesting building/creation
    description: "Build your own unique monster or character by dragging and dropping clothes and accessories. Sparks creativity!",
    dataAiHint: "monster builder character"
  },
  {
    title: "Hidden Object Puzzles",
    icon: Search,
    description: "Find hidden items in colorful scenes like a monster beach or a winter wonderland. Boosts observation skills!",
    dataAiHint: "hidden object seek-find"
  },
  {
    title: "Memory Match Challenge",
    icon: Brain,
    description: "Test your memory by finding matching pairs of cards. Great for concentration and cognitive skills!",
    dataAiHint: "memory game cards"
  },
  {
    title: "Creative Puzzles",
    icon: PuzzleIcon,
    description: "Solve shape puzzles or piece together animal jigsaws. Develops problem-solving and spatial awareness.",
    dataAiHint: "jigsaw shape puzzle"
  },
  {
    title: "Coloring Studio",
    icon: Palette,
    description: "Unleash your inner artist with fun coloring pages – from ice cream to birthday parties! Encourages creativity and fine motor skills.",
    dataAiHint: "coloring art creative"
  }
];

export default function FunGamesPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <Gamepad2 className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">Fun & Interactive Games</h1>
        <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
          Dive into a visually attractive world of exciting and fun games, designed to entertain, challenge, and help develop various skills in a playful way! Get ready for age-appropriate adventures.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameCategories.map((category) => (
          <Card key={category.title} className="shadow-lg flex flex-col hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <category.icon className="h-8 w-8 text-accent" />
                <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50">
                <Image
                  src={`https://placehold.co/400x225.png`}
                  alt={`${category.title} game illustration`}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                  data-ai-hint={category.dataAiHint}
                />
              </div>
              <p className="text-xs text-muted-foreground mb-3 text-center">
                Interactive game coming soon! Rewards can be earned upon completion.
              </p>
              <Button disabled className="w-full">
                <PlayCircle className="mr-2 h-4 w-4" />
                Play {category.title.split(" ")[0]} Game (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card className="mt-12 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Game Customization & Progress</CardTitle>
          <CardDescription>
            Parents and therapists will be able to customize game content, difficulty, and track progress.
            Games can be dynamically suggested based on individual learning goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50">
            <Image
              src="https://placehold.co/600x300.png"
              alt="Game customization dashboard"
              width={600}
              height={300}
              className="object-cover w-full h-full"
              data-ai-hint="dashboard game settings"
            />
          </div>
          <p className="text-foreground/80">
            Future features will include the ability to:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-foreground/70">
            <li>Select specific games for a child's playlist.</li>
            <li>Adjust game settings (e.g., number of pairs in memory match, difficulty of puzzles).</li>
            <li>View game completion rates and earned rewards.</li>
            <li>Integrate game achievements with the main Reward System.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
