export function trackEvent(eventName: string, properties?: Record<string, any>) {
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
