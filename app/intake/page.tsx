
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/custom/Header";
import { FileUploader } from "@/components/custom/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpload } from "@/hooks/useUpload";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function IntakePage() {
    const router = useRouter();
    const { uploadFile, isUploading } = useUpload();
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        clinicName: "",
        department: "",
        useCase: "",
        compliance: "",
    });

    const handleFilesSelected = (selectedFiles: File[]) => {
        setFiles(selectedFiles);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0) {
            toast.error("Please upload at least one document.");
            return;
        }

        try {
            // In a real app, we'd loop through files or send them all.
            // For mock, we just take the first one.
            const jobId = await uploadFile(files[0], formData);

            // Save metadata to localStorage for history
            const historyItem = {
                jobId,
                filename: files[0].name,
                uploadedAt: new Date().toISOString(),
                status: "processing",
                ...formData
            };

            const existingHistory = JSON.parse(localStorage.getItem("job_history") || "[]");
            localStorage.setItem("job_history", JSON.stringify([historyItem, ...existingHistory]));

            toast.success("Documents uploaded successfully!");
            router.push(`/results/${jobId}`);
        } catch {
            toast.error("Failed to upload documents. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Header />
            <main className="flex-1 container py-10 max-w-3xl">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">New Intake</h1>
                    <p className="text-muted-foreground">
                        Upload clinical documents and configure processing settings.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Clinic & Context</CardTitle>
                            <CardDescription>
                                Provide details to tailor the AI extraction.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="clinicName">Clinic Name</Label>
                                    <Input
                                        id="clinicName"
                                        placeholder="e.g. City General"
                                        required
                                        value={formData.clinicName}
                                        onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        placeholder="e.g. Cardiology"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="useCase">Primary Use Case</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, useCase: val })} required>
                                        <SelectTrigger id="useCase">
                                            <SelectValue placeholder="Select use case" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="triage">Triage</SelectItem>
                                            <SelectItem value="audit">Audit</SelectItem>
                                            <SelectItem value="billing">Billing</SelectItem>
                                            <SelectItem value="clinical_summary">Clinical Summary</SelectItem>
                                            <SelectItem value="research">Research</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="compliance">Compliance Standard</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, compliance: val })} required>
                                        <SelectTrigger id="compliance">
                                            <SelectValue placeholder="Select standard" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hipaa">HIPAA</SelectItem>
                                            <SelectItem value="gdpr">GDPR</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Documents</Label>
                                <FileUploader onFilesSelected={handleFilesSelected} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={isUploading}>
                                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isUploading ? "Processing..." : "Process Documents"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </main>
        </div>
    );
}
