"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mountain } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
      </div>
      <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Mountain className="h-6 w-6 text-primary" />
        <span className="sr-only">Thrive Studio Home</span>
      </Link>
      <h1 className="flex-1 text-xl font-semibold font-headline">Thrive Studio</h1>
      {/* Add User Menu or other header items here if needed */}
    </header>
  );
}
