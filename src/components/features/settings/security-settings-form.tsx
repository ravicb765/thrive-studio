
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, KeyRound } from "lucide-react";

const pinFormSchema = z.object({
  currentPin: z.string().optional(), // Optional, only needed if changing an existing PIN
  newPin: z.string().length(4, "PIN must be exactly 4 digits.").regex(/^\d{4}$/, "PIN must be 4 digits."),
  confirmNewPin: z.string().length(4, "PIN must be exactly 4 digits.").regex(/^\d{4}$/, "PIN must be 4 digits."),
}).refine(data => data.newPin === data.confirmNewPin, {
  message: "New PINs do not match.",
  path: ["confirmNewPin"],
});

type PinFormData = z.infer<typeof pinFormSchema>;

export function SecuritySettingsForm() {
  const { userProfile, setPin: setAuthPin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PinFormData>({
    resolver: zodResolver(pinFormSchema),
    defaultValues: {
      currentPin: "",
      newPin: "",
      confirmNewPin: "",
    },
  });

  const onSubmit: SubmitHandler<PinFormData> = async (data) => {
    setIsLoading(true);

    // In a real app with existing PINs, you'd verify currentPin against a stored HASHED pin first.
    // For this prototype, if userProfile.pin exists, we'll assume currentPin should match it.
    if (userProfile?.pin && data.currentPin !== userProfile.pin) {
        toast({
            title: "Incorrect Current PIN",
            description: "The current PIN you entered is incorrect.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    const success = await setAuthPin(data.newPin);
    if (success) {
      form.reset();
      // Toast is handled by setAuthPin
    } else {
      // Toast is handled by setAuthPin for error cases
    }
    setIsLoading(false);
  };

  if (userProfile?.role !== 'parent_teacher') {
    return <p className="text-destructive">You do not have permission to access these settings.</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {userProfile?.pin && (
          <FormField
            control={form.control}
            name="currentPin"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="currentPin">Current PIN (if changing)</FormLabel>
                <FormControl>
                  <Input id="currentPin" type="password" placeholder="Enter your current 4-digit PIN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="newPin"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="newPin">New 4-Digit PIN</FormLabel>
              <FormControl>
                <Input id="newPin" type="password" placeholder="Enter new 4-digit PIN" {...field} maxLength={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPin"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmNewPin">Confirm New PIN</FormLabel>
              <FormControl>
                <Input id="confirmNewPin" type="password" placeholder="Confirm new 4-digit PIN" {...field} maxLength={4}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving PIN...
            </>
          ) : (
            <>
              <KeyRound className="mr-2 h-4 w-4" />
              {userProfile?.pin ? "Change PIN" : "Set PIN"}
            </>
          )}
        </Button>
      </form>
      <p className="mt-4 text-xs text-muted-foreground">
        <strong>Important:</strong> In a production application, PINs should be securely hashed. This prototype uses a simplified approach for demonstration.
      </p>
    </Form>
  );
}
