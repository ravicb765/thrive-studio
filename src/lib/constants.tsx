
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Sparkles, CalendarDays, Leaf, Wind, Waves, Puzzle, BookOpenText, Star, ListChecks, Users, BarChart3, UserCog, PackagePlus, Ear, HeartHandshake, Mic2, Brain, Hand, Smile, Music, ShieldAlert, Settings2 } from 'lucide-react'; // Added Smile, Music, ShieldAlert, Settings2 as potential better icons

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean; // Keep this for items truly not ready
  adminOnly?: boolean; // Could use this or check href directly in sidebar
}

// Using ShieldAlert for Caregiver Admin and Settings2 for Therapist Portal as UserCog is generic
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Alliterative Exercise', href: '/alliterative-exercise', icon: Sparkles },
  { label: 'Visual Scheduler', href: '/visual-scheduler', icon: CalendarDays },
  { label: 'Yoga Zone', href: '/yoga-zone', icon: Leaf },
  { label: 'Breathing Exercises', href: '/breathing-exercises', icon: Wind },
  { label: 'Calm Corner', href: '/calm-corner', icon: Waves },
  // Future features (can be enabled by removing disabled flag)
  { label: 'Articulation Games', href: '/articulation-games', icon: Puzzle, disabled: true },
  { label: 'Vocabulary Builder', href: '/vocabulary-builder', icon: BookOpenText, disabled: true },
  { label: 'Reward System', href: '/reward-system', icon: Star, disabled: true },
  { label: 'Fine Motor Games', href: '/fine-motor-games', icon: Hand, disabled: true },
  { label: 'Self-Care Checklist', href: '/self-care-checklist', icon: ListChecks, disabled: true },
  { label: 'Basic AAC Board', href: '/aac-board', icon: Mic2, disabled: true },
  { label: 'Social Stories', href: '/social-stories', icon: Users, disabled: true },
  { label: 'Emotion Selector', href: '/emotion-selector', icon: Smile, disabled: true }, // Changed from custom SmilePlus
  { label: 'Dance Time', href: '/dance-time', icon: Music, disabled: true }, // Changed from custom Music2
  { label: 'Expressing Pain', href: '/expressing-pain', icon: HeartHandshake, disabled: true }, // Changed from custom PlusCircle
  { label: 'Behavior Tracker', href: '/behavior-tracker', icon: Brain, disabled: true },
  { label: 'Progress Dashboard', href: '/progress-dashboard', icon: BarChart3, disabled: true },
  // Role-restricted items - 'disabled' flag removed, visibility controlled by role in sidebar
  { label: 'Caregiver Admin', href: '/caregiver-admin', icon: ShieldAlert }, 
  { label: 'Therapist Portal', href: '/therapist-portal', icon: Settings2 }, 
  { label: 'Content Packs', href: '/content-packs', icon: PackagePlus, disabled: true },
];

// Removed custom SVG components as lucide-react provides similar ones.
// If specific custom icons are absolutely needed, they can be re-added.

export const FEATURE_CARDS = [
  { title: "Alliterative Exercise", description: "Fun, catchy phrases where movements match words to boost language, memory, and movement.", href: "/alliterative-exercise", icon: Sparkles, dataAiHint: "exercise routine" },
  { title: "Visual Scheduler", description: "Organize daily tasks with First-Then boards and icon-based routines.", href: "/visual-scheduler", icon: CalendarDays, dataAiHint: "schedule planning" },
  { title: "Yoga Zone", description: "Calming yoga sequences with visual guides and soothing music.", href: "/yoga-zone", icon: Leaf, dataAiHint: "yoga meditation" },
  { title: "Breathing Exercises", description: "Regulate anxiety with visual breathing tools and sound cues.", href: "/breathing-exercises", icon: Wind, dataAiHint: "mindfulness calm" },
  { title: "Calm Corner", description: "Relax with calming sounds, gentle animations, and sensory tools.", href: "/calm-corner", icon: Waves, dataAiHint: "relaxation nature" },
  // Add other active features here if they should appear on the dashboard
];
