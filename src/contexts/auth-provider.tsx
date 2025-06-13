
"use client";

import type { User } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useEffect, type ReactNode } from "react";
import { auth, db } from "@/lib/firebase"; // Import db
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import { useToast } from "@/hooks/use-toast";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'parent_teacher' | 'child' | 'admin' | null; // Define possible roles
  createdAt?: any; // serverTimestamp type
  lastLogin?: any; // serverTimestamp type
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null; // Add userProfile
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        // Fetch or create user profile in Firestore
        const userDocRef = doc(db, "userProfiles", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const profileData = userDocSnap.data() as UserProfile;
          setUserProfile(profileData);
          // Update last login time
          await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
        } else {
          // New user, create profile
          const newUserProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            role: 'parent_teacher', // Default role for new sign-ups
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
          };
          await setDoc(userDocRef, newUserProfile);
          setUserProfile(newUserProfile);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    // setLoading(true); // setLoading is handled by onAuthStateChanged
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Profile creation/fetch will be handled by onAuthStateChanged
      toast({
        title: "Signed In",
        description: "Successfully signed in with Google.",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        title: "Sign In Error",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
      setUser(null); 
      setUserProfile(null);
      setLoading(false); // Ensure loading is false on error if onAuthStateChanged doesn't fire quickly
    }
  };

  const signOutUser = async () => {
    // setLoading(true); // setLoading is handled by onAuthStateChanged
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
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
    } finally {
       // setLoading(false); // onAuthStateChanged will handle this
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
