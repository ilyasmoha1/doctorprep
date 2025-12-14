"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    // Redirect to login if not authenticated or not admin
    useEffect(() => {
        if (!isAuthenticated || user?.role !== "admin") {
            router.push("/login");
        }
    }, [isAuthenticated, user, router]);

    // Don't render anything if not authenticated or not admin
    if (!isAuthenticated || user?.role !== "admin") {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <AdminHeader />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
