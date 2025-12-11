"use client";

import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/components/get-started-button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
    buttonText?: string;
}

export function PricingCard({ title, price, description, features, popular, buttonText = "Get Started" }: PricingCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl p-8 shadow-sm transition-all hover:shadow-md relative bg-card h-full flex flex-col",
                popular
                    ? "border-2 border-primary ring-4 ring-primary/10 scale-105 z-10"
                    : "border border-border/50"
            )}
        >
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-md">
                    Most Popular
                </div>
            )}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold">{price}</span>
                    {price !== "Free" && <span className="text-sm text-muted-foreground">/month</span>}
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex-1 mb-8">
                <ul className="space-y-3">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <GetStartedButton
                className={cn(
                    "w-full rounded-full transition-all",
                    popular ? "shadow-lg shadow-primary/25" : ""
                )}
                variant={popular ? "default" : "outline"}
                onClick={() => {
                    import("@/lib/analytics").then(({ trackEvent }) => {
                        trackEvent("pricing_plan_clicked", { plan: title, price });
                    });
                }}
            >
                {buttonText}
            </GetStartedButton>
        </div>
    );
}
