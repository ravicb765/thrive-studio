import { PoseCard } from "@/components/features/yoga-zone/pose-card";
import { Leaf } from "lucide-react";

const yogaPoses = [
  {
    name: "Tree Pose",
    imageUrl: "https://placehold.co/400x300.png",
    description: "Find your balance and stand tall like a strong tree. Good for focus and stability.",
    dataAiHint: "yoga balance tree"
  },
  {
    name: "Cat Cow Pose",
    imageUrl: "https://placehold.co/400x300.png",
    description: "Gently warm up your spine with this flowing movement. Great for flexibility.",
    dataAiHint: "yoga stretch spine"
  },
  {
    name: "Downward Dog",
    imageUrl: "https://placehold.co/400x300.png",
    description: "Stretch your whole body from hands to heels. An energizing and calming pose.",
    dataAiHint: "yoga stretch whole-body"
  },
  {
    name: "Warrior II",
    imageUrl: "https://placehold.co/400x300.png",
    description: "Feel strong and powerful in this standing pose. Builds strength and confidence.",
    dataAiHint: "yoga strength warrior"
  },
  {
    name: "Child's Pose",
    imageUrl: "https://placehold.co/400x300.png",
    description: "A restful pose to calm the mind and gently stretch your back and hips.",
    dataAiHint: "yoga relax calm"
  },
  {
    name: "Butterfly Pose",
    imageUrl: "https://placehold.co/400x300.png",
    description: "Open your hips and imagine your legs are butterfly wings. Soothing and gentle.",
    dataAiHint: "yoga stretch hips"
  },
];

export default function YogaZonePage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <Leaf className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">Yoga Zone</h1>
        <p className="mt-2 text-lg text-foreground/80">
          Discover peace and strength with our guided yoga poses.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {yogaPoses.map((pose) => (
          <PoseCard
            key={pose.name}
            name={pose.name}
            imageUrl={pose.imageUrl}
            description={pose.description}
            dataAiHint={pose.dataAiHint}
          />
        ))}
      </div>
    </div>
  );
}
