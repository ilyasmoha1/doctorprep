"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Video,
    BookOpen,
    Settings,
    GraduationCap,
    HelpCircle
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Questions", href: "/admin/questions", icon: HelpCircle },
    { name: "Content", href: "/admin/content", icon: Video },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-muted/30">
            {/* Logo/Brand */}
            <div className="flex h-16 items-center gap-2 border-b px-6">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="font-bold text-lg">DoctorPrep</h2>
                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/admin" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t p-4">
                <p className="text-xs text-muted-foreground text-center">
                    © 2024 DoctorPrep
                </p>
            </div>
        </div>
    );
}
