
// Placeholder page for Therapist Portal
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UserCog } from "lucide-react"; // Or another appropriate icon

export default function TherapistPortalPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10 text-center">
        <UserCog className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">Therapist Portal</h1>
        <p className="mt-2 text-lg text-foreground/80">
          Access tools and resources for therapy sessions.
        </p>
      </header>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Therapist Dashboard</CardTitle>
          <CardDescription>This area provides tools and information for therapists.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90">
            Content specific to therapists, such as client management (with consent), session planning tools,
            and professional resources will go here.
            This page should be protected and only accessible to users with the 'parent_teacher' (or a future 'therapist') role
            and after PIN verification if the parent area is locked.
          </p>
          {/* Add more placeholder content or components as needed */}
        </CardContent>
      </Card>
    </div>
  );
}
