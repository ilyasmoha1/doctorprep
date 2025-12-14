"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    GraduationCap,
    Settings,
    LogOut,
    User,
    Activity,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Practice Questions",
        href: "/questions",
        icon: HelpCircle,
    },
    {
        title: "Study Planner",
        href: "/dashboard/planner",
        icon: Calendar,
    },
    {
        title: "Resources & Modules",
        href: "/dashboard/resources",
        icon: BookOpen,
    },
    {
        title: "Performance",
        href: "/dashboard/performance",
        icon: Activity,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card">
            <div className="flex h-16 items-center px-6 border-b">
                <Link href="/" className="flex items-center space-x-2">
                    <GraduationCap className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold text-foreground">DoctorPrep</span>
                </Link>
            </div>

            <div className="flex-1 overflow-auto py-6 px-4">
                <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center text-sm gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium",
                                pathname === item.href
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                    <Settings className="h-5 w-5" />
                    Settings
                </Button>
                <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-muted/50 mt-4">
                    <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">Dr. Student</p>
                        <p className="text-xs text-muted-foreground truncate">Free Plan</p>
                    </div>
                    <LogOut className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-destructive" />
                </div>
            </div>
        </div>
    );
}
