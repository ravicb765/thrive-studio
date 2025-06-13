
// src/ai/flows/generate-exercise-routine.ts
'use server';

/**
 * @fileOverview Generates an alliterative exercise routine based on a target word/sound.
 * The routine consists of multiple exercises, each with a name, activity, and benefit.
 *
 * - generateExerciseRoutine - A function that generates the exercise routine.
 * - GenerateExerciseRoutineInput - The input type for the generateExerciseRoutine function.
 * - GenerateExerciseRoutineOutput - The return type for the generateExerciseRoutine function, containing a list of exercises.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExerciseRoutineInputSchema = z.object({
  targetWord: z
    .string()
    .describe('The target word or sound for the alliterative exercise routine.'),
});
export type GenerateExerciseRoutineInput = z.infer<typeof GenerateExerciseRoutineInputSchema>;

// Define the structure for a single exercise
const ExerciseDetailSchema = z.object({
  name: z.string().describe("The alliterative name of the exercise (e.g., 'Jumping Jaguars'). Should be catchy and related to the target word."),
  activity: z.string().describe("A clear description of the physical movement or activity to be performed (e.g., 'Jump enthusiastically in place')."),
  benefit: z.string().describe("The primary developmental or fun benefit of the exercise (e.g., 'Enhances gross motor skills and rhythmic coordination').")
});

// Update the main output schema to be an array of these exercises
const GenerateExerciseRoutineOutputSchema = z.object({
  exercises: z.array(ExerciseDetailSchema)
    .min(1, "At least one exercise should be generated.")
    .describe('A list of generated alliterative exercises. Each exercise includes an alliterative name, a description of the activity, and its key benefit.')
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
Your primary goal is to create a fun, engaging, and beneficial exercise routine based on a {{{targetWord}}}.
The routine should consist of a list of individual exercises.
For each exercise, you must provide:
1. An alliterative "name".
2. A clear "activity" description.
3. The main "benefit" of the exercise.

The output must conform to the provided schema, which expects an array of exercise objects, each with 'name', 'activity', and 'benefit' fields.

Here are some examples to guide you:
- For a target like 'Jaguar': { "name": "Jumping Jaguars", "activity": "Jump in place", "benefit": "Gross motor + rhythm" }
- For a target like 'Turtle': { "name": "Twisting Turtles", "activity": "Twist torso side to side", "benefit": "Core strength + coordination" }
- For a target like 'Bear': { "name": "Bouncing Bears", "activity": "Bounce on spot", "benefit": "Burn energy safely" }
- For a target like 'Shark': { "name": "Stomping Sharks", "activity": "Big stomps with hands on hips", "benefit": "Stress relief + fun" }
- For a target like 'Cat': { "name": "Clapping Cats", "activity": "Clapping rhythm game", "benefit": "Motor + auditory processing" }

Focus on creativity and ensure the exercises are suitable for promoting language, memory, and movement.
Generate the exercises for the target word: {{{targetWord}}}.
  `,
  config: {
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
