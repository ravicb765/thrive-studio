"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateExerciseRoutine, type GenerateExerciseRoutineOutput } from "@/ai/flows/generate-exercise-routine";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  targetWord: z.string().min(2, { message: "Target word must be at least 2 characters." }).max(50, { message: "Target word must be at most 50 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function ExerciseForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [routine, setRoutine] = useState<GenerateExerciseRoutineOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetWord: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setRoutine(null);
    try {
      const result = await generateExerciseRoutine({ targetWord: data.targetWord });
      setRoutine(result);
      toast({
        title: "Routine Generated!",
        description: "Your alliterative exercise routine is ready.",
      });
    } catch (error) {
      console.error("Error generating routine:", error);
      toast({
        title: "Error",
        description: "Failed to generate exercise routine. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <CardTitle className="font-headline text-2xl">Create Your Routine</CardTitle>
          </div>
          <CardDescription>
            Enter a target word or sound, and we&apos;ll magically craft an alliterative exercise routine for you! Perfect for boosting language, memory, and movement skills.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
               <div className="aspect-video_ rounded-md overflow-hidden mb-4 bg-muted/50">
                <Image
                    src="https://placehold.co/600x300.png"
                    alt="Alliterative Exercise illustration"
                    width={600}
                    height={300}
                    className="object-cover w-full h-full"
                    data-ai-hint="fitness exercise fun"
                />
               </div>
              <FormField
                control={form.control}
                name="targetWord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="targetWord" className="text-lg">Target Word/Sound</FormLabel>
                    <FormControl>
                      <Input id="targetWord" placeholder="e.g., Jump, Happy, Sss" {...field} className="text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Routine
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {routine && (
        <Card className="shadow-lg animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Custom Routine: &quot;{form.getValues("targetWord")}&quot;</CardTitle>
            <CardDescription>Get ready to move and groove with these alliterative actions!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none dark:prose-invert whitespace-pre-line bg-muted/30 p-4 rounded-md">
                {routine.routine}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
