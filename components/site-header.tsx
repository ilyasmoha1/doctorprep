"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/components/get-started-button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                // Mobile: standard top bar. Desktop: pushed down slightly to create the "floating" effect
                "md:flex md:justify-center md:pt-6"
            )}
        >
            {/* Main Navigation Container 
               Mobile: Full width, rectangular, standard border-b
               Desktop: Centered 'Pill' shape, rounded, floating shadow
            */}
            <div
                className={cn(
                    "flex items-center justify-between transition-all duration-300",
                    "bg-background/80 backdrop-blur-md border-border/40",
                    // Mobile Styles
                    "w-full px-4 py-3 border-b",
                    // Desktop Styles (The Centralized Pill)
                    "md:w-auto md:min-w-[800px] md:max-w-[1200px] md:rounded-full md:border md:shadow-lg md:px-6 md:py-2 md:h-16"
                )}
            >

                {/* Logo - Positioned left in the pill */}
                <div className="flex items-center flex-shrink-0">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                            <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">
                            DoctorPrep
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav - Centered in the pill */}
                <nav className="hidden md:flex items-center gap-6 mx-8">
                    <NavLinks />
                </nav>

                {/* Desktop Actions - Right in the pill */}
                <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
                    <Link href="/login" className="text-sm font-bold text-foreground/80 hover:text-foreground transition-colors px-2">
                        Log in
                    </Link>
                    <GetStartedButton size="sm" className="rounded-full px-5 font-bold shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all">
                        Get Started
                    </GetStartedButton>
                </div>

                {/* Mobile Toggle - Right aligned on mobile */}
                <div className="flex md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Anchored below the header */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[60px] left-0 w-full bg-background border-b border-border shadow-2xl animate-in slide-in-from-top-2">
                    <nav className="container px-4 py-6 flex flex-col space-y-4">
                        <NavLinks mobile onClick={() => setIsMobileMenuOpen(false)} />
                        <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start font-bold">Log in</Button>
                            </Link>
                            <div onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                <GetStartedButton className="w-full rounded-full font-bold">Get Started</GetStartedButton>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

function NavLinks({ mobile, onClick }: { mobile?: boolean, onClick?: () => void }) {
    const baseClass = mobile
        ? "text-lg font-bold p-2 hover:bg-muted rounded-lg transition-colors"
        : "text-sm font-medium text-foreground/70 transition-colors hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full";

    return (
        <>
            <Link href="#features" className={baseClass} onClick={onClick}>
                Features
            </Link>
            <Link href="#testimonials" className={baseClass} onClick={onClick}>
                Success Stories
            </Link>
            <Link href="#pricing" className={baseClass} onClick={onClick}>
                Plans
            </Link>
        </>
    );
}