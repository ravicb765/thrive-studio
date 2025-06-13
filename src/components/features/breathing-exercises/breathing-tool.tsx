
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wind, Play, Pause, RefreshCw } from "lucide-react";
import Image from "next/image";

type BreathingTechnique = 'circle' | 'box';

export function BreathingTool() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [instruction, setInstruction] = useState("Select a technique and tap Start");
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique>('circle');

  // For Circle Breathing visual
  const [circleAnimationClass, setCircleAnimationClass] = useState("");
  // For Box Breathing visual
  const [boxPhaseClass, setBoxPhaseClass] = useState("");

  useEffect(() => {
    let breathCycleInterval: NodeJS.Timeout;
    let phaseTimer: NodeJS.Timeout;

    if (isBreathing) {
      if (selectedTechnique === 'circle') {
        const inhaleTime = 4000;
        const holdTime = 2000;
        const exhaleTime = 4000;
        const totalCycleTime = inhaleTime + holdTime + exhaleTime;

        const cycle = () => {
          setInstruction("Breathe In...");
          setCircleAnimationClass("animate-inhale");
          phaseTimer = setTimeout(() => {
            setInstruction("Hold...");
            // Circle stays large during hold after inhale
            phaseTimer = setTimeout(() => {
              setInstruction("Breathe Out...");
              setCircleAnimationClass("animate-exhale");
            }, holdTime);
          }, inhaleTime);
        };
        cycle(); // Start first cycle immediately
        breathCycleInterval = setInterval(cycle, totalCycleTime);
      } else if (selectedTechnique === 'box') {
        const phaseTime = 4000; // 4 seconds for each phase of box breathing
        const totalCycleTime = phaseTime * 4;

        const cycle = () => {
          setInstruction("Breathe In...");
          setBoxPhaseClass("phase-inhale");
          phaseTimer = setTimeout(() => {
            setInstruction("Hold...");
            setBoxPhaseClass("phase-hold1");
            phaseTimer = setTimeout(() => {
              setInstruction("Breathe Out...");
              setBoxPhaseClass("phase-exhale");
              phaseTimer = setTimeout(() => {
                setInstruction("Hold...");
                setBoxPhaseClass("phase-hold2");
              }, phaseTime); // Exhale Hold
            }, phaseTime);   // Exhale
          }, phaseTime);     // Inhale Hold
        };
        cycle();
        breathCycleInterval = setInterval(cycle, totalCycleTime);
      }
    } else {
      setInstruction(selectedTechnique === 'circle' ? "Tap Start for Circle Breathing" : "Tap Start for Box Breathing");
      setCircleAnimationClass("");
      setBoxPhaseClass("");
    }

    return () => {
      clearInterval(breathCycleInterval);
      clearTimeout(phaseTimer);
    };
  }, [isBreathing, selectedTechnique]);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
  };

  const selectTechnique = (technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setIsBreathing(false); // Stop current cycle when technique changes
  };

  return (
    <>
      <style jsx global>{`
        .breathing-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: hsl(var(--accent));
          transition: transform 4s ease-in-out;
          transform: scale(0.8); /* Initial smaller size */
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

        .box-breathing-visual {
          width: 100%;
          height: 100%;
          border: 4px solid hsl(var(--muted) / 0.7);
          background-color: hsl(var(--card)); /* Changed from --background for better contrast within card */
          border-radius: 0.75rem;
          transition: border-color 0.5s ease-in-out, background-color 0.5s ease-in-out;
        }
        .box-breathing-visual.phase-inhale { border-color: hsl(var(--accent)); background-color: hsl(var(--accent) / 0.1); }
        .box-breathing-visual.phase-hold1 { border-color: hsl(var(--accent)); background-color: hsl(var(--accent) / 0.2); }
        .box-breathing-visual.phase-exhale { border-color: hsl(var(--primary)); background-color: hsl(var(--primary) / 0.1); }
        .box-breathing-visual.phase-hold2 { border-color: hsl(var(--primary)); background-color: hsl(var(--primary) / 0.2); }
      `}</style>
      <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader className="text-center">
          <Wind className="h-10 w-10 text-primary mx-auto mb-2" />
          <CardTitle className="font-headline text-3xl text-primary">Breathing Guide</CardTitle>
          <CardDescription>Select a technique and follow the visual guide to find calm.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 p-6">
          <div className="flex justify-center gap-4 mb-4 w-full">
            <Button
              variant={selectedTechnique === 'circle' ? 'default' : 'outline'}
              onClick={() => selectTechnique('circle')}
              className="flex-1"
            >
              Circle Breathing
            </Button>
            <Button
              variant={selectedTechnique === 'box' ? 'default' : 'outline'}
              onClick={() => selectTechnique('box')}
              className="flex-1"
            >
              Box Breathing
            </Button>
          </div>

           <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50 w-full max-w-md">
            <Image
                src="https://placehold.co/400x225.png"
                alt="Calm nature scene"
                width={400}
                height={225}
                className="object-cover w-full h-full"
                data-ai-hint="calm nature peaceful"
            />
           </div>

          <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center my-4">
            {selectedTechnique === 'circle' && (
              <div className={`breathing-circle ${circleAnimationClass}`}></div>
            )}
            {selectedTechnique === 'box' && (
              <div className={`box-breathing-visual ${boxPhaseClass}`}></div>
            )}
          </div>

          <p className="text-2xl font-semibold text-foreground/90 min-h-[64px] text-center w-full">{instruction}</p>

          <Button 
            onClick={toggleBreathing} 
            className="w-1/2 bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-lg min-w-[150px]"
            aria-label={isBreathing ? "Pause breathing exercise" : "Start breathing exercise"}
          >
            {isBreathing ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isBreathing ? "Pause" : "Start"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
