// src/ai/flows/generate-exercise-routine.ts
'use server';

/**
 * @fileOverview Generates an alliterative exercise routine based on a target word/sound.
 *
 * - generateExerciseRoutine - A function that generates the exercise routine.
 * - GenerateExerciseRoutineInput - The input type for the generateExerciseRoutine function.
 * - GenerateExerciseRoutineOutput - The return type for the generateExerciseRoutine function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExerciseRoutineInputSchema = z.object({
  targetWord: z
    .string()
    .describe('The target word or sound for the alliterative exercise routine.'),
});
export type GenerateExerciseRoutineInput = z.infer<typeof GenerateExerciseRoutineInputSchema>;

const GenerateExerciseRoutineOutputSchema = z.object({
  routine: z
    .string()
    .describe('The generated alliterative exercise routine based on the target word.'),
});
export type GenerateExerciseRoutineOutput = z.infer<typeof GenerateExerciseRoutineOutputSchema>;

export async function generateExerciseRoutine(
  input: GenerateExerciseRoutineInput
): Promise<GenerateExerciseRoutineOutput> {
  return generateExerciseRoutineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExerciseRoutinePrompt',
  input: {schema: GenerateExerciseRoutineInputSchema},
  output: {schema: GenerateExerciseRoutineOutputSchema},
  prompt: `You are a creative exercise routine generator specializing in alliterative phrases.

  Generate an exercise routine based on the target word, using alliterative phrases and movements related to that word.
  The goal is to create a fun and engaging routine that targets improvements in language, memory, and movement.

  Target Word: {{{targetWord}}}
  Routine:
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateExerciseRoutineFlow = ai.defineFlow(
  {
    name: 'generateExerciseRoutineFlow',
    inputSchema: GenerateExerciseRoutineInputSchema,
    outputSchema: GenerateExerciseRoutineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
