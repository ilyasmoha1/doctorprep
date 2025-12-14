"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { studentStore } from "@/lib/student-store";

type UserRole = "admin" | "student";

interface User {
    id?: number;
    name: string;
    email: string;
    role: UserRole;
    plan?: "Free" | "Pro" | "Institutional";
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => { success: boolean; role?: UserRole; error?: string };
    logout: () => void;
    updateSettings: (settings: any) => void;
    settings: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN = {
    email: "admin@doctorprep.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole,
};


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
        // Check sessionStorage on mount
        const storedUser = sessionStorage.getItem("doctorprep_user");
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

    const login = (email: string, password: string): { success: boolean; role?: UserRole; error?: string } => {
        // Check admin credentials
        if (email === ADMIN.email && password === ADMIN.password) {
            const adminUser: User = {
                name: ADMIN.name,
                email: ADMIN.email,
                role: ADMIN.role,
            };
            setUser(adminUser);
            sessionStorage.setItem("doctorprep_user", JSON.stringify(adminUser));
            return { success: true, role: "admin" };
        }

        // Check student credentials against registered students
        const student = studentStore.getByEmail(email);

        if (!student) {
            return {
                success: false,
                error: "Student not found. Please contact admin to register."
            };
        }

        if (student.status !== "Active") {
            return {
                success: false,
                error: "Your account is inactive. Please contact admin."
            };
        }

        if (student.password === password) {
            const studentUser: User = {
                id: student.id,
                name: student.name,
                email: student.email,
                role: "student",
                plan: student.plan,
            };
            setUser(studentUser);
            sessionStorage.setItem("doctorprep_user", JSON.stringify(studentUser));
            return { success: true, role: "student" };
        }

        // Invalid password
        return { success: false, error: "Invalid password" };
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("doctorprep_user");
        router.push("/login");
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
