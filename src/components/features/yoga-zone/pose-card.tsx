import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface PoseCardProps {
  name: string;
  imageUrl: string;
  description: string;
  dataAiHint: string;
}

export function PoseCard({ name, imageUrl, description, dataAiHint }: PoseCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-video_ relative w-full h-48"> {/* Fixed height for consistency */}
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            data-ai-hint={dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 text-primary">{name}</CardTitle>
        <p className="text-sm text-foreground/75">{description}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
          <PlayCircle className="mr-2 h-5 w-5" />
          Start Pose
        </Button>
      </CardFooter>
    </Card>
  );
}
