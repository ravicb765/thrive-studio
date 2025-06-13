
"use client";

import { useContext } from "react";
import { AuthContext, type UserProfile } from "@/contexts/auth-provider";
import type { User } from "firebase/auth";

interface UseAuthReturn {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isParentAreaLocked: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  setPin: (newPin: string) => Promise<boolean>;
  verifyPin: (enteredPin: string) => Promise<boolean>;
  lockParentArea: () => void;
  unlockParentArea: () => void;
  hasRole: (role: UserProfile['role']) => boolean;
}

export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  const hasRole = (roleToCheck: UserProfile['role']): boolean => {
    return !!context.userProfile && context.userProfile.role === roleToCheck;
  };

  return { ...context, hasRole };
}
