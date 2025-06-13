
"use client"; // Required for useAuth hook

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ListChecks, Trophy, Gift, Edit3, ShieldCheck, CheckCircle2, Music, Palette, Film, Sparkles as StickerIcon } from "lucide-react"; // Added more icons
import { useAuth } from "@/hooks/use-auth"; // To conditionally show admin features
import Image from "next/image";

export default function RewardSystemPage() {
  const { userProfile } = useAuth();
  const isParentTeacher = userProfile?.role === 'parent_teacher';

  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <Star className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">Rewards Center</h1>
        <p className="mt-2 text-lg text-foreground/80">
          Complete tasks, earn stars, and unlock exciting rewards!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tasks / Missions Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <ListChecks className="h-7 w-7 text-accent" />
              <CardTitle className="font-headline text-2xl">Today's Missions</CardTitle>
            </div>
            <CardDescription>Complete these tasks to earn stars!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
              <span className="text-foreground/90">Brush Teeth Morning</span>
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
              <span className="text-foreground/90">Finish Reading Assignment</span>
              <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">Mark Done</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
              <span className="text-foreground/90">Practice Articulation Sounds</span>
              <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">Mark Done</Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">(More tasks will appear here)</p>
          </CardContent>
        </Card>

        {/* Visual Progress Tracker Card */}
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-7 w-7 text-accent" />
              <CardTitle className="font-headline text-2xl">Your Progress</CardTitle>
            </div>
            <CardDescription>See how many stars you've collected! Some rewards unlock automatically at milestones.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="my-4">
              <Star className="h-20 w-20 text-yellow-400 fill-yellow-400 mx-auto" />
            </div>
            <p className="text-5xl font-bold text-primary">25</p>
            <p className="text-muted-foreground">Stars Earned</p>
             <div className="w-full bg-muted rounded-full h-2.5 my-4">
              <div className="bg-accent h-2.5 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <p className="text-xs text-muted-foreground">Next milestone: Unlock "Dance Video!" at 50 stars.</p>
          </CardContent>
        </Card>

        {/* Rewards Catalog Card */}
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-2 mb-1">
              <Gift className="h-7 w-7 text-accent" />
              <CardTitle className="font-headline text-2xl">Rewards Store</CardTitle>
            </div>
            <CardDescription>Spend your stars on exciting and fun visual rewards! Unlock avatar upgrades, new sounds, cool animations, or special parent-created treats!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-foreground/90 block">Unlock New Avatar Outfit</span>
                  <span className="text-xs text-muted-foreground">Cost: 50 Stars</span>
                </div>
              </div>
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">Unlock</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
               <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-foreground/90 block">Calming Ocean Sound</span>
                  <span className="text-xs text-muted-foreground">Cost: 30 Stars</span>
                </div>
              </div>
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">Unlock</Button>
            </div>
             <div className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
               <div className="flex items-center gap-2">
                <StickerIcon className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-foreground/90 block">Animated Animal Sticker Pack</span>
                  <span className="text-xs text-muted-foreground">Cost: 20 Stars</span>
                </div>
              </div>
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">Unlock</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
               <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-foreground/90 block">Unlock 'Dancing Robot' Animation</span>
                  <span className="text-xs text-muted-foreground">Cost: 60 Stars</span>
                </div>
              </div>
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">Unlock</Button>
            </div>
             <div className="flex items-center justify-between p-3 bg-card-foreground/5 rounded-md">
               <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <span className="text-foreground/90 block">Special: Ice Cream Time!</span>
                  <span className="text-xs text-muted-foreground">(Parent Created) Cost: 100 Stars</span>
                </div>
              </div>
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">Claim</Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">(More rewards coming soon!)</p>
          </CardContent>
        </Card>
      </div>

      {/* Custom Task Creation for Parents/Teachers */}
      {isParentTeacher && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <CardTitle className="font-headline text-2xl">Admin: Manage & Customize Tasks & Rewards</CardTitle>
            </div>
            <CardDescription>
              As a parent or teacher, you can create custom tasks, define their star values, choose or upload visual rewards (like "Ice cream time!"), set task frequency (daily, once, repeatable), and track overall progress or streaks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50">
              <Image
                src="https://placehold.co/600x300.png"
                alt="Task management illustration with reward customization options"
                width={600}
                height={300}
                className="object-cover w-full h-full"
                data-ai-hint="planning tasks checklist rewards"
              />
            </div>
            <p className="mb-4 text-foreground/90">
              This section will provide tools to:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Add new, personalized tasks (e.g., "Help with chores", "Practice kindness").</li>
                <li>Assign star values to tasks.</li>
                <li>Link specific visual or parent-defined rewards to tasks or star milestones.</li>
                <li>Define how often tasks should appear (e.g., daily, one-time, or repeatable for streaks).</li>
                <li>View progress, including streaks or a calendar view of task completion.</li>
                <li>Manage the list of "Parent-Created Rewards" available in the store.</li>
              </ul>
            </p>
            <Button disabled className="w-full md:w-auto">
              <Edit3 className="mr-2 h-4 w-4" />
              Manage Custom Tasks & Rewards (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
