
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/custom/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Clock } from "lucide-react";

interface JobHistoryItem {
    jobId: string;
    filename: string;
    uploadedAt: string;
    clinicName: string;
    useCase: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<JobHistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("job_history");
        if (saved) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHistory(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-muted/10">
            <Header />
            <main className="flex-1 container py-10 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Document History</h1>
                        <p className="text-muted-foreground">
                            View and manage your previously processed documents.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/intake">New Upload</Link>
                    </Button>
                </div>

                {history.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent className="space-y-4">
                            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">No documents yet</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto">
                                    Upload your first clinical document to see the magic happen.
                                </p>
                            </div>
                            <Button asChild variant="outline">
                                <Link href="/intake">Start Now</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {history.map((job, i) => (
                            <Link key={i} href={`/results/${job.jobId}`}>
                                <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-lg">
                                                <FileText className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{job.filename}</h3>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(job.uploadedAt).toLocaleDateString()}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{job.clinicName}</span>
                                                    <span>•</span>
                                                    <Badge variant="secondary" className="text-xs h-5 font-normal">
                                                        {job.useCase}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
