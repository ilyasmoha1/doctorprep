"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Platform Settings</h2>
                <p className="text-muted-foreground">
                    Configure platform settings and preferences
                </p>
            </div>

            {/* General Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                        Basic platform configuration
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue="DoctorPrep" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="support-email">Support Email</Label>
                        <Input id="support-email" type="email" defaultValue="support@doctorprep.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="max-students">Maximum Students</Label>
                        <Input id="max-students" type="number" defaultValue="1000" />
                    </div>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Email Settings</CardTitle>
                    <CardDescription>
                        Configure email notifications and templates
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="smtp-host">SMTP Host</Label>
                        <Input id="smtp-host" placeholder="smtp.example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="smtp-port">SMTP Port</Label>
                        <Input id="smtp-port" type="number" placeholder="587" />
                    </div>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Email Settings
                    </Button>
                </CardContent>
            </Card>

            {/* Storage Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Storage Settings</CardTitle>
                    <CardDescription>
                        Configure video storage and CDN settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="s3-bucket">S3 Bucket Name</Label>
                        <Input id="s3-bucket" placeholder="doctorprep-videos" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cdn-url">CDN URL</Label>
                        <Input id="cdn-url" placeholder="https://cdn.doctorprep.com" />
                    </div>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Storage Settings
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
