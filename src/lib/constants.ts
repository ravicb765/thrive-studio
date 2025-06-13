import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Sparkles, CalendarDays, Lotus, Wind, Waves, Puzzle, BookOpenText, Star, ListChecks, Users, BarChart3, UserCog, PackagePlus, Ear, HeartHandshake, Mic2, Brain, Hand } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Alliterative Exercise', href: '/alliterative-exercise', icon: Sparkles },
  { label: 'Visual Scheduler', href: '/visual-scheduler', icon: CalendarDays },
  { label: 'Yoga Zone', href: '/yoga-zone', icon: Lotus },
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
  { label: 'Emotion Selector', href: '/emotion-selector', icon: SmilePlus, disabled: true },
  { label: 'Dance Time', href: '/dance-time', icon: Music2, disabled: true },
  { label: 'Expressing Pain', href: '/expressing-pain', icon: PlusCircle, disabled: true },
  { label: 'Behavior Tracker', href: '/behavior-tracker', icon: Brain, disabled: true },
  { label: 'Progress Dashboard', href: '/progress-dashboard', icon: BarChart3, disabled: true },
  { label: 'Caregiver Admin', href: '/caregiver-admin', icon: ShieldCheck, disabled: true },
  { label: 'Therapist Portal', href: '/therapist-portal', icon: UserCog, disabled: true },
  { label: 'Content Packs', href: '/content-packs', icon: PackagePlus, disabled: true },
];

interface SmilePlusProps extends React.SVGProps<SVGSVGElement> {}

function SmilePlus(props: SmilePlusProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
      <line x1="12" y1="6" x2="12" y2="9" />
      <line x1="12" y1="17" x2="12" y2="18" />
    </svg>
  );
}


interface Music2Props extends React.SVGProps<SVGSVGElement> {}
function Music2(props: Music2Props): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="18" r="4"></circle>
      <path d="M12 18V2l7 4V2"></path>
    </svg>
  );
}

interface PlusCircleProps extends React.SVGProps<SVGSVGElement> {}
function PlusCircle(props: PlusCircleProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
}

interface ShieldCheckProps extends React.SVGProps<SVGSVGElement> {}
function ShieldCheck(props: ShieldCheckProps): JSX.Element {
 return (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  );
}


export const FEATURE_CARDS = [
  { title: "Alliterative Exercise", description: "Fun, catchy phrases where movements match words to boost language, memory, and movement.", href: "/alliterative-exercise", icon: Sparkles, dataAiHint: "exercise routine" },
  { title: "Visual Scheduler", description: "Organize daily tasks with First-Then boards and icon-based routines.", href: "/visual-scheduler", icon: CalendarDays, dataAiHint: "schedule planning" },
  { title: "Yoga Zone", description: "Calming yoga sequences with visual guides and soothing music.", href: "/yoga-zone", icon: Lotus, dataAiHint: "yoga meditation" },
  { title: "Breathing Exercises", description: "Regulate anxiety with visual breathing tools and sound cues.", href: "/breathing-exercises", icon: Wind, dataAiHint: "mindfulness calm" },
  { title: "Calm Corner", description: "Relax with calming sounds, gentle animations, and sensory tools.", href: "/calm-corner", icon: Waves, dataAiHint: "relaxation nature" },
];
