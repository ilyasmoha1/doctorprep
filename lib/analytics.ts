// Event names for type safety
export const AnalyticsEvents = {
    // Roadmap Events
    ROADMAP_GENERATION_STARTED: "roadmap_generation_started",
    ROADMAP_GENERATION_SUCCESS: "roadmap_generation_success",
    ROADMAP_GENERATION_FAILED: "roadmap_generation_failed",

    // Form Events
    FORM_SUBMITTED: "form_submitted",
    FORM_VALIDATION_ERROR: "form_validation_error",

    // User Interactions
    BUTTON_CLICKED: "button_clicked",
    LINK_CLICKED: "link_clicked",
    SETTINGS_UPDATED: "settings_updated",

    // Video Events
    VIDEO_STARTED: "video_started",
    VIDEO_COMPLETED: "video_completed",
    VIDEO_PROGRESS: "video_progress",

    // Dashboard Events
    DASHBOARD_VIEWED: "dashboard_viewed",
    MODULE_CLICKED: "module_clicked",
} as const;

export type AnalyticsEventName = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

export function trackEvent(eventName: AnalyticsEventName | string, properties?: Record<string, any>) {
    // In a real app, this would send data to Mixpanel, Google Analytics, or a backend endpoint.
    // For now, we simulate this by logging to the console.

    if (typeof window !== "undefined") {
        console.groupCollapsed(`[Analytics] ${eventName}`);
        console.log("Timestamp:", new Date().toISOString());
        if (properties) {
            console.log("Properties:", properties);
        }
        console.groupEnd();
    }
}

// Helper function to track page views
export function trackPageView(pageName: string, properties?: Record<string, any>) {
    trackEvent("page_viewed", { page: pageName, ...properties });
}
