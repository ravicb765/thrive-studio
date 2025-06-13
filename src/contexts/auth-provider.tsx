
"use client";

import type { User } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useEffect, type ReactNode } from "react";
import { auth, db } from "@/lib/firebase"; // Import db
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { useToast } from "@/hooks/use-toast";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'parent_teacher' | 'child' | 'admin' | null; // Define possible roles
  createdAt?: any; // serverTimestamp type
  lastLogin?: any; // serverTimestamp type
  // IMPORTANT: In a production app, PINs must be securely hashed (ideally server-side with a unique salt)
  // and never stored in plaintext. This is a simplified placeholder for prototyping.
  pin?: string; // Storing plain PIN for prototype simplicity.
  isParentAreaLocked?: boolean; // Tracks if parent-specific areas require PIN re-entry
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isParentAreaLocked: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  setPin: (newPin: string) => Promise<boolean>;
  verifyPin: (enteredPin: string) => Promise<boolean>;
  lockParentArea: () => void;
  unlockParentArea: () => void; // Added for explicit unlock without PIN after verification
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isParentAreaLocked, setIsParentAreaLocked] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        // Fetch or create user profile in Firestore.
        // Note: Firebase services (like Firestore and Auth) use HTTPS for data in transit.
        // Firestore encrypts data at rest by default.
        // Data retention policies can be configured on collections (e.g., 'userProfiles')
        // via TTL (Time-to-Live) policies in the Firebase Console.
        const userDocRef = doc(db, "userProfiles", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const profileData = userDocSnap.data() as UserProfile;
          setUserProfile(profileData);
          if (profileData.pin) { // Lock if PIN is set
            setIsParentAreaLocked(profileData.isParentAreaLocked !== undefined ? profileData.isParentAreaLocked : true);
          } else {
            setIsParentAreaLocked(false); // No PIN set, so no lock
          }
          await updateDoc(userDocRef, { lastLogin: serverTimestamp() });
        } else {
          // New user, create profile
          const newUserProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            role: 'parent_teacher', // Default role for new sign-ups
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            pin: undefined, // No PIN initially
            isParentAreaLocked: false, // Not locked initially if no PIN
          };
          await setDoc(userDocRef, newUserProfile);
          setUserProfile(newUserProfile);
          setIsParentAreaLocked(false);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setIsParentAreaLocked(true); // Lock when signed out
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Signed In",
        description: "Successfully signed in with Google.",
      });
      // Profile creation/fetch and lock state handled by onAuthStateChanged
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        title: "Sign In Error",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
      setUser(null);
      setUserProfile(null);
      setIsParentAreaLocked(true);
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      if (user && userProfile) {
         // Persist lock state on sign out if PIN is set
        const userDocRef = doc(db, "userProfiles", user.uid);
        await updateDoc(userDocRef, { isParentAreaLocked: userProfile.pin ? true : false });
      }
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      setIsParentAreaLocked(true); // Always lock on sign out
      toast({
        title: "Signed Out",
        description: "Successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign Out Error",
        description: "Could not sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const setPin = async (newPin: string): Promise<boolean> => {
    if (!user || !userProfile) {
      toast({ title: "Not Authenticated", description: "You must be logged in to set a PIN.", variant: "destructive" });
      return false;
    }
    if (userProfile.role !== 'parent_teacher') {
      toast({ title: "Permission Denied", description: "Only Parent/Teacher can set a PIN.", variant: "destructive" });
      return false;
    }
    // Basic PIN validation (e.g., 4 digits) can be added here
    if (!/^\d{4}$/.test(newPin)) {
      toast({ title: "Invalid PIN", description: "PIN must be 4 digits.", variant: "destructive" });
      return false;
    }

    try {
      const userDocRef = doc(db, "userProfiles", user.uid);
      // In a real app, hash the PIN securely before saving.
      // const hashedPin = await bcrypt.hash(newPin, 10); // Example using bcrypt (server-side)
      await updateDoc(userDocRef, { pin: newPin, isParentAreaLocked: true }); // Store plain PIN for prototype, lock on set
      setUserProfile(prev => prev ? { ...prev, pin: newPin, isParentAreaLocked: true } : null);
      setIsParentAreaLocked(true); // Lock parent area after setting/changing PIN
      toast({ title: "PIN Set", description: "Your PIN has been updated successfully." });
      return true;
    } catch (error) {
      console.error("Error setting PIN:", error);
      toast({ title: "PIN Error", description: "Could not set PIN. Please try again.", variant: "destructive" });
      return false;
    }
  };

  const verifyPin = async (enteredPin: string): Promise<boolean> => {
    if (!userProfile || !userProfile.pin) {
      // No PIN set, or no user profile
      setIsParentAreaLocked(false); // Consider unlocked if no PIN is configured
      return true; // Or false if strict checking is needed
    }
    // In a real app, compare enteredPin with the securely hashed PIN.
    // const match = await bcrypt.compare(enteredPin, userProfile.pinHash);
    if (enteredPin === userProfile.pin) {
      setIsParentAreaLocked(false);
      // Persist unlocked state
      if (user) {
        const userDocRef = doc(db, "userProfiles", user.uid);
        await updateDoc(userDocRef, { isParentAreaLocked: false });
        setUserProfile(prev => prev ? { ...prev, isParentAreaLocked: false } : null);
      }
      toast({ title: "Access Granted", description: "Parent area unlocked." });
      return true;
    } else {
      toast({ title: "Incorrect PIN", description: "The PIN you entered is incorrect.", variant: "destructive" });
      return false;
    }
  };

  const lockParentArea = async () => {
    setIsParentAreaLocked(true);
    if (user && userProfile && userProfile.pin) {
      const userDocRef = doc(db, "userProfiles", user.uid);
      await updateDoc(userDocRef, { isParentAreaLocked: true });
      setUserProfile(prev => prev ? { ...prev, isParentAreaLocked: true } : null);
    }
  };
  
  const unlockParentArea = () => {
    // This function is for explicitly unlocking without re-entering PIN,
    // e.g., after initial successful verification within a session.
    // The actual PIN verification should happen in verifyPin.
    setIsParentAreaLocked(false);
     if (user && userProfile && userProfile.pin) {
      const userDocRef = doc(db, "userProfiles", user.uid);
      updateDoc(userDocRef, { isParentAreaLocked: false }); // Best effort, no await needed for this UI state change
      setUserProfile(prev => prev ? { ...prev, isParentAreaLocked: false } : null);
    }
  };


  const value = {
    user,
    userProfile,
    loading,
    isParentAreaLocked,
    signInWithGoogle,
    signOutUser,
    setPin,
    verifyPin,
    lockParentArea,
    unlockParentArea,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Helper for client-side hashing (placeholder - prefer server-side hashing)
// async function simpleHash(text: string): Promise<string> {
//   // In a real app, use a strong hashing library like bcrypt or Argon2,
//   // ideally performed server-side or in a secure environment.
//   // This is a VERY basic placeholder and NOT secure for production.
//   const encoder = new TextEncoder();
//   const data = encoder.encode(text);
//   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//   return hashHex;
// }
