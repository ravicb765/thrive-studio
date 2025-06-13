"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wind, Play, Pause } from "lucide-react";
import Image from "next/image";

export function BreathingTool() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [instruction, setInstruction] = useState("Tap Start to Begin");
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    let breathCycle: NodeJS.Timeout;
    let instructionTimer: NodeJS.Timeout;

    if (isBreathing) {
      const cycle = () => {
        setInstruction("Breathe In...");
        setAnimationClass("animate-inhale");
        instructionTimer = setTimeout(() => {
          setInstruction("Hold...");
          // No specific animation for hold, or can add one
          instructionTimer = setTimeout(() => {
            setInstruction("Breathe Out...");
            setAnimationClass("animate-exhale");
          }, 2000); // Hold duration
        }, 4000); // Inhale duration
      };
      cycle(); // Start first cycle immediately
      breathCycle = setInterval(cycle, 10000); // Total cycle duration (4s in + 2s hold + 4s out)
    } else {
      setInstruction("Tap Start to Begin");
      setAnimationClass("");
    }

    return () => {
      clearInterval(breathCycle);
      clearTimeout(instructionTimer);
    };
  }, [isBreathing]);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
  };

  return (
    <>
      <style jsx global>{`
        .breathing-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background-color: hsl(var(--accent));
          transition: transform 4s ease-in-out;
          transform: scale(0.8); /* Initial smaller size for exhale state */
        }
        .animate-inhale {
          animation: inhale 4s ease-in-out forwards;
        }
        .animate-exhale {
          animation: exhale 4s ease-in-out forwards;
        }
        @keyframes inhale {
          0% { transform: scale(0.8); }
          100% { transform: scale(1.2); }
        }
        @keyframes exhale {
          0% { transform: scale(1.2); }
          100% { transform: scale(0.8); }
        }
        @media (min-width: 768px) { /* md */
          .breathing-circle {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
      <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader className="text-center">
          <Wind className="h-10 w-10 text-primary mx-auto mb-2" />
          <CardTitle className="font-headline text-3xl text-primary">Visual Breathing Guide</CardTitle>
          <CardDescription>Follow the circle to guide your breath and find calm.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8 p-6">
           <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50 w-full max-w-md">
            <Image
                src="https://placehold.co/400x225.png" // 16:9 aspect ratio
                alt="Calm nature scene"
                width={400}
                height={225}
                className="object-cover w-full h-full"
                data-ai-hint="calm nature peaceful"
            />
           </div>
          <div className="relative w-[150px] h-[150px] md:w-[250px] md:h-[250px] flex items-center justify-center">
            <div className={`breathing-circle ${animationClass}`}></div>
          </div>
          <p className="text-2xl font-semibold text-foreground/90 min-h-[32px]">{instruction}</p>
          <Button onClick={toggleBreathing} className="w-1/2 bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-lg">
            {isBreathing ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isBreathing ? "Pause" : "Start"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
