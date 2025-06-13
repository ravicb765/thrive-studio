"use client";

import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface SoundButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void; // Actual sound playing logic would go here
}

export function SoundButton({ label, icon: Icon, onClick }: SoundButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Placeholder for actual sound playing logic
    alert(`Playing ${label}... (This is a placeholder)`);
  };

  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-32 w-32 md:h-40 md:w-40 p-4 gap-2 rounded-lg border-2 border-primary hover:bg-primary/10 transition-colors duration-200"
      onClick={handleClick}
      aria-label={`Play ${label}`}
    >
      <Icon className="h-12 w-12 md:h-16 md:w-16 text-primary" />
      <span className="text-sm md:text-base text-primary font-medium">{label}</span>
    </Button>
  );
}
