
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Activity } from "lucide-react";

interface Task {
  id: string;
  text: string;
  icon: string; // Placeholder for icon selection, using URL for now
  dataAiHint: string;
}

export function SchedulerBoard() {
  const [firstTask, setFirstTask] = useState<Task>({
    id: "first",
    text: "Wake up at 6:00 AM",
    icon: "https://placehold.co/100x100.png",
    dataAiHint: "alarm clock morning"
  });
  const [thenTask, setThenTask] = useState<Task>({
    id: "then",
    text: "Bathroom routine (toilet, brush teeth)",
    icon: "https://placehold.co/100x100.png",
    dataAiHint: "toothbrush toilet"
  });

  const handleTextChange = (taskId: string, newText: string) => {
    if (taskId === "first") {
      setFirstTask({ ...firstTask, text: newText });
    } else {
      setThenTask({ ...thenTask, text: newText });
    }
  };

  // In a real app, icon selection would be more complex
  // For now, we just use placeholder icons.
  
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl text-primary">My First-Then Board</CardTitle>
        <CardDescription>Let&apos;s plan our activities step-by-step! Here&apos;s an example to get you started.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-8">
          {/* First Task */}
          <Card className="w-full md:w-2/5 p-4 shadow-md">
            <CardHeader className="p-2 text-center">
              <CardTitle className="font-headline text-xl text-accent">First</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-accent p-1 bg-background">
                <Image src={firstTask.icon} alt="First task icon" width={96} height={96} data-ai-hint={firstTask.dataAiHint} className="object-cover"/>
              </div>
              <Activity className="w-8 h-8 text-accent md:hidden"/> {/* Icon visible on small screens */}
              <Label htmlFor="first-task-input" className="sr-only">First task description</Label>
              <Input
                id="first-task-input"
                value={firstTask.text}
                onChange={(e) => handleTextChange("first", e.target.value)}
                placeholder="e.g., Finish homework"
                className="text-center text-base"
                aria-label="First task description"
              />
            </CardContent>
          </Card>

          {/* Arrow Separator */}
          <div className="flex items-center justify-center text-primary">
            <ArrowRight className="h-10 w-10 md:h-16 md:w-16 transform md:rotate-0 rotate-90" />
          </div>

          {/* Then Task */}
          <Card className="w-full md:w-2/5 p-4 shadow-md">
            <CardHeader className="p-2 text-center">
              <CardTitle className="font-headline text-xl text-accent">Then</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-accent p-1 bg-background">
                <Image src={thenTask.icon} alt="Then task icon" width={96} height={96} data-ai-hint={thenTask.dataAiHint} className="object-cover"/>
              </div>
              <CheckCircle2 className="w-8 h-8 text-accent md:hidden"/> {/* Icon visible on small screens */}
              <Label htmlFor="then-task-input" className="sr-only">Then task description</Label>
              <Input
                id="then-task-input"
                value={thenTask.text}
                onChange={(e) => handleTextChange("then", e.target.value)}
                placeholder="e.g., Play outside"
                className="text-center text-base"
                aria-label="Then task description"
              />
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => {
            // Logic to save or use the schedule
            alert(`Schedule Set: First ${firstTask.text || 'do something'}, Then ${thenTask.text || 'do something else'}.`);
          }}>
            Set Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

