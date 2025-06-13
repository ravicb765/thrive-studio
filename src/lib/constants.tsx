
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Sparkles, CalendarDays, Leaf, Wind, Waves, Puzzle, BookOpenText, Star, ListChecks, Users, BarChart3, UserCog, PackagePlus, Ear, HeartHandshake, Mic2, Brain, Hand, Smile, Music, ShieldAlert, Settings2, ClipboardList, Activity, Gamepad2, Copy, Apple, ToyBrick, Search, Palette } from 'lucide-react'; // Added Gamepad2, Copy, Apple, ToyBrick, Search, Palette

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
  { label: 'Reward System', href: '/reward-system', icon: Star, disabled: false },
  { label: 'Articulation Games', href: '/articulation-games', icon: Puzzle, disabled: false },
  { label: 'OT Activities', href: '/ot-activities', icon: ClipboardList, disabled: false },
  { label: 'Fun Games', href: '/fun-games', icon: Gamepad2, disabled: false },
  // Future features (can be enabled by removing disabled flag)
  { label: 'Vocabulary Builder', href: '/vocabulary-builder', icon: BookOpenText, disabled: true },
  { label: 'Fine Motor Games', href: '/fine-motor-games', icon: Hand, disabled: true }, // This is a general one, OT Activities page is more specific.
  { label: 'Self-Care Checklist', href: '/self-care-checklist', icon: ListChecks, disabled: true }, // Also covered in OT Activities page.
  { label: 'Basic AAC Board', href: '/aac-board', icon: Mic2, disabled: true },
  { label: 'Social Stories', href: '/social-stories', icon: Users, disabled: true },
  { label: 'Emotion Selector', href: '/emotion-selector', icon: Smile, disabled: true },
  { label: 'Dance Time', href: '/dance-time', icon: Music, disabled: true },
  { label: 'Expressing Pain', href: '/expressing-pain', icon: HeartHandshake, disabled: true },
  { label: 'Behavior Tracker', href: '/behavior-tracker', icon: Brain, disabled: true },
  { label: 'Progress Dashboard', href: '/progress-dashboard', icon: BarChart3, disabled: true },
  // Role-restricted items - 'disabled' flag removed, visibility controlled by role in sidebar
  { label: 'Caregiver Admin', href: '/caregiver-admin', icon: ShieldAlert },
  { label: 'Therapist Portal', href: '/therapist-portal', icon: Settings2 },
  { label: 'Content Packs', href: '/content-packs', icon: PackagePlus, disabled: true },
];

export const FEATURE_CARDS = [
  { title: "Alliterative Exercise", description: "Fun, catchy phrases where movements match words to boost language, memory, and movement.", href: "/alliterative-exercise", icon: Sparkles, dataAiHint: "exercise routine" },
  { title: "Visual Scheduler", description: "Organize daily tasks with First-Then boards and icon-based routines.", href: "/visual-scheduler", icon: CalendarDays, dataAiHint: "schedule planning" },
  { title: "Yoga Zone", description: "Calming yoga sequences with visual guides and soothing music.", href: "/yoga-zone", icon: Leaf, dataAiHint: "yoga meditation" },
  { title: "Breathing Exercises", description: "Regulate anxiety with visual breathing tools and sound cues.", href: "/breathing-exercises", icon: Wind, dataAiHint: "mindfulness calm" },
  { title: "Calm Corner", description: "Relax with calming sounds, gentle animations, and sensory tools.", href: "/calm-corner", icon: Waves, dataAiHint: "relaxation nature" },
  { title: "Reward System", description: "Encourage positive behaviors and task completion with stars and fun rewards.", href: "/reward-system", icon: Star, dataAiHint: "achievement stars" },
  { title: "Articulation Games", description: "Practice speech sounds and build skills with fun, interactive ABA-based tasks.", href: "/articulation-games", icon: Puzzle, dataAiHint: "speech therapy games" },
  { title: "OT Activities", description: "Develop daily living, motor, and sensory skills with guided OT tasks.", href: "/ot-activities", icon: ClipboardList, dataAiHint: "therapy daily-living" },
  { title: "Fun Games", description: "A collection of interactive games for entertainment and skill development.", href: "/fun-games", icon: Gamepad2, dataAiHint: "kids games interactive" },
  // Add other active features here if they should appear on the dashboard
];

// Re-exporting icons used in FEATURE_CARDS if they are not directly from NAV_ITEMS to avoid type errors with conditional icon usage.
// This is not strictly necessary if all icons are directly in NAV_ITEMS and FEATURE_CARDS references them.
// However, ensuring icons like 'Gamepad2' used directly in FEATURE_CARDS are part of an export helps if there's any indirection.
export { Gamepad2, Copy, Apple, ToyBrick, Search, Palette, Brain as BrainIcon }; // Added Brain as BrainIcon for Memory Match
