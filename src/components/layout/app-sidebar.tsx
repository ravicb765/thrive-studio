
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain, Settings } from "lucide-react"; // Changed SettingsIcon to Settings
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAV_ITEMS, type NavItem } from "@/lib/constants.tsx";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth"; // Import useAuth

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { userProfile, loading } = useAuth(); // Get userProfile and loading state

  const handleLinkClick = () => {
    if (window.innerWidth < 768) { // md breakpoint
      setOpenMobile(false);
    }
  };
  
  const isParentTeacher = userProfile?.role === 'parent_teacher';

  // Filter nav items based on role
  const visibleNavItems = NAV_ITEMS.filter(item => {
    if (item.href === '/caregiver-admin' || item.href === '/therapist-portal') {
      return isParentTeacher;
    }
    return true; // Show all other items by default
  });
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={handleLinkClick}>
          <Mountain className="h-8 w-8 text-sidebar-primary" />
          <span className="text-lg font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">Thrive Studio</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {loading ? (
            // You can add skeleton loaders here if you want
            <p className="p-2 text-sm text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">Loading menu...</p>
          ) : (
            visibleNavItems.map((item: NavItem) => (
              <SidebarMenuItem key={item.label} className={cn(item.disabled && "opacity-50 pointer-events-none")}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={item.label}
                  className="justify-start"
                  disabled={item.disabled}
                >
                  <Link href={item.disabled ? "#" : item.href} onClick={handleLinkClick}>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t border-sidebar-border p-2">
        {/* Footer content if any, e.g. settings or user profile link */}
         <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center">
            <Settings className="h-5 w-5" />
           <span className="group-data-[collapsible=icon]:hidden ml-2">Settings</span>
         </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

// Keeping SettingsIcon definition in case it's used elsewhere, 
// but lucide-react's Settings is preferred.
function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73 2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
