"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface GetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    showIcon?: boolean;
}

export function GetStartedButton({
    children = "Get Started",
    variant = "default",
    size = "default",
    showIcon = false,
    className,
    ...props
}: GetStartedButtonProps) {
    const { isAuthenticated, login } = useAuth();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        import("@/lib/analytics").then(({ trackEvent }) => {
            trackEvent("get_started_clicked", {
                location: window.location.pathname,
                authenticated: isAuthenticated
            });
        });

        if (isAuthenticated) {
            router.push("/dashboard");
        } else {
            router.push("/login"); // Flow: Login Page -> Dashboard
        }
        if (props.onClick) props.onClick(e);
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
            {showIcon && <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>
    );
}
