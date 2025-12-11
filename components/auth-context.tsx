"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    plan: "Free" | "Pro" | "Institutional";
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    updateSettings: (settings: any) => void;
    settings: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Settings mock - persisting to local state for session
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        studyReminders: true
    });

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem("doctorprep_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedSettings = localStorage.getItem("doctorprep_settings");
        if (storedSettings) {
            setSettings(JSON.parse(storedSettings));
        }

        setIsLoading(false);
    }, []);

    // Apply Dark Mode effect
    useEffect(() => {
        if (settings.darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [settings.darkMode]);

    const login = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const mockUser: User = {
                name: "Dr. Candidate",
                email: "student@doctorprep.com",
                plan: "Free",
            };
            setUser(mockUser);
            localStorage.setItem("doctorprep_user", JSON.stringify(mockUser));
            setIsLoading(false);
            router.push("/dashboard");
        }, 800);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("doctorprep_user");
        router.push("/");
    };

    const updateSettings = (newSettings: any) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem("doctorprep_settings", JSON.stringify(updated));
            return updated;
        });
        console.log("Settings updated:", newSettings);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
            settings,
            updateSettings
        }}>
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
