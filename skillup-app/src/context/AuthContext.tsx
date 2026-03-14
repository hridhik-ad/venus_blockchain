"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  address?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  showAuthModal: boolean;
  login: (email: string, name?: string, walletAddress?: string) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Mock persistence
  useEffect(() => {
    const saved = localStorage.getItem("cw_auth");
    if (saved) {
      const data = JSON.parse(saved);
      setIsLoggedIn(true);
      setUser(data);
    }
  }, []);

  const login = (email: string, name: string = "User", walletAddress: string = "0x71C...a2B9") => {
    const userData = { name, email, address: walletAddress };
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("cw_auth", JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("cw_auth");
  };

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        showAuthModal,
        login,
        logout,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
