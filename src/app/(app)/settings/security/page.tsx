
import { SecuritySettingsForm } from "@/components/features/settings/security-settings-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function SecuritySettingsPage() {
  return (
    <div className="container mx-auto max-w-xl py-8">
      <header className="mb-8 text-center">
        <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-3" />
        <h1 className="text-3xl font-bold font-headline text-primary">Security Settings</h1>
        <p className="mt-2 text-md text-foreground/80">
          Manage your account security, including setting a PIN for parent/teacher areas.
        </p>
      </header>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Set or Change Your PIN</CardTitle>
          <CardDescription>
            Set a 4-digit PIN to protect access to sensitive parent/teacher sections of the app.
            This PIN will be required if the parent area is locked.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SecuritySettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
