
"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
    AlertTriangle,
    CheckCircle2,
    FileText,
    MessageSquare,
    RefreshCw,
    Download,
    Trash2,
    ChevronRight,
    Copy,
    Wand2,
    AlertCircle,
    Pencil
} from "lucide-react";
import { useJobStatus } from "@/hooks/useJobStatus";
import { useResults } from "@/hooks/useResults";
import { useChat } from "@/hooks/useChat";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { ResultsSkeleton } from "@/components/custom/Skeletons";
import { Input } from "@/components/ui/input";

export default function ResultsPage({ params }: { params: Promise<{ jobId: string }> }) {
    const { jobId } = use(params);
    const router = useRouter();

    const { status } = useJobStatus(jobId);
    const { data: results, loading: resultsLoading } = useResults(jobId);
    const { messages, sendMessage, loading: chatLoading } = useChat(jobId);
    const [chatInput, setChatInput] = useState("");

    // Polling/Loading state handling
    if (status === 'processing' || (status === 'processed' && resultsLoading)) {
        return (
            <div className="min-h-screen flex flex-col bg-muted/10">
                <Header />
                <main className="flex-1 container py-6">
                    <div className="mb-6 space-y-2">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <div className="space-y-1">
                                <Skeleton className="h-5 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    </div>
                    <ResultsSkeleton />
                </main>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container py-10 flex flex-col items-center justify-center space-y-4">
                    <AlertCircle className="h-16 w-16 text-destructive" />
                    <h2 className="text-xl font-semibold">Processing Failed</h2>
                    <Button onClick={() => router.push('/intake')}>Try Again</Button>
                </main>
            </div>
        );
    }

    if (!results) return null;

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        sendMessage(chatInput);
        setChatInput("");
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/10">
            <Header />

            {/* Top Bar */}
            <div className="border-b bg-background sticky top-14 z-40">
                <div className="container py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-sm sm:text-base">{results.filename}</h1>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{new Date(results.uploadedAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{(results.stats.wordCount / 1000).toFixed(1)}k words</span>
                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 h-5">Processed</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => toast.success("Regenerating analysis...")}>
                            <RefreshCw className="mr-2 h-3 w-3" /> Regenerate
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-3 w-3" /> Original
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <main className="flex-1 container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Main Analysis */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Top Actions */}
                    <Card className="border-l-4 border-l-primary shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                Top Clinical Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            {results.topActions.map((action: { id: string; priority: string; title: string; effort: string; details: string }) => (
                                <div key={action.id} className="group flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                                    <div className={`mt-1 h-2 w-2 rounded-full ${action.priority === 'Critical' ? 'bg-red-500' : action.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-sm">{action.title}</p>
                                            <Badge variant="secondary" className="text-[10px] h-5">{action.effort} Effort</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{action.details}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 h-8 w-8">
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* AI Summary */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-lg">Clinical Summary</CardTitle>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => toast.success("Summary copied!")}>Copy</Button>
                                <Button variant="outline" size="sm" className="h-7 text-xs">DOCX</Button>
                            </div>

                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm max-w-none text-muted-foreground">
                                <ReactMarkdown>{results.summary}</ReactMarkdown>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Patient Details */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Extracted Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Patient Name</label>
                                    <div className="flex items-center justify-between border-b py-1">
                                        <span>{results.patientDetails.name}</span>
                                        <Pencil className="h-3 w-3 text-muted-foreground cursor-pointer" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">DOB</label>
                                    <div className="flex items-center justify-between border-b py-1">
                                        <span>{results.patientDetails.dob}</span>
                                        <Pencil className="h-3 w-3 text-muted-foreground cursor-pointer" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-medium text-muted-foreground">Medications</label>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {results.patientDetails.medications.map((med: string, i: number) => (
                                            <Badge key={i} variant="secondary" className="font-normal">{med}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-medium text-muted-foreground">Labs</label>
                                    <div className="mt-2 rounded-md border">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-muted/50">
                                                <tr>
                                                    <th className="p-2 font-medium">Test</th>
                                                    <th className="p-2 font-medium">Value</th>
                                                    <th className="p-2 font-medium">Range</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results.patientDetails.labs.map((lab: { name: string; value: string; unit: string; normalRange: string }, i: number) => (
                                                    <tr key={i} className="border-t">
                                                        <td className="p-2">{lab.name}</td>
                                                        <td className="p-2 font-medium">{lab.value} {lab.unit}</td>
                                                        <td className="p-2 text-muted-foreground">{lab.normalRange}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Risk Flags */}
                    <Card className="shadow-sm border-red-100 dark:border-red-900/20">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-5 w-5" />
                                Risk Flags
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {results.riskFlags.map((risk: { id: string; message: string; severity: string }) => (
                                <div key={risk.id} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-red-900 dark:text-red-200">{risk.message}</p>
                                        <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">Severity: {risk.severity}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                </div>

                {/* Right Column: Sidebar Tools */}
                <div className="space-y-6">

                    {/* Chat */}
                    <Card className="flex flex-col h-[500px] shadow-sm sticky top-24">
                        <CardHeader className="pb-3 border-b bg-muted/20">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <MessageSquare className="h-4 w-4" />
                                Chat with Document
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden p-0 relative">
                            <ScrollArea className="h-full p-4">
                                <div className="space-y-4 pb-4">
                                    {messages.length === 0 && (
                                        <div className="text-center text-sm text-muted-foreground py-8">
                                            Ask about the patient or document (e.g., &quot;What are the next diagnostic steps?&quot;)
                                        </div>
                                    )}
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                                : 'bg-muted rounded-bl-none'
                                                }`}>
                                                <p>{msg.content}</p>
                                                {msg.sources && (
                                                    <div className="mt-2 pt-2 border-t border-black/10 text-[10px] opacity-70">
                                                        Sources: {msg.sources.join(", ")}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {chatLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3">
                                                <div className="flex gap-1">
                                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce delay-75" />
                                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce delay-150" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <div className="p-3 border-t bg-background">
                            <form onSubmit={handleChatSubmit} className="flex gap-2">
                                <Input
                                    placeholder="Ask a question..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit" size="icon" disabled={chatLoading || !chatInput.trim()}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </Card>

                    {/* Rewrite Tools */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Wand2 className="h-4 w-4" />
                                Rewrite Tools
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Button variant="outline" className="justify-start h-auto py-2 px-3 text-left">
                                <div className="flex flex-col items-start gap-0.5">
                                    <span className="text-sm font-medium">Simplify Text</span>
                                    <span className="text-xs text-muted-foreground">Make it easier to read</span>
                                </div>
                            </Button>
                            <Button variant="outline" className="justify-start h-auto py-2 px-3 text-left">
                                <div className="flex flex-col items-start gap-0.5">
                                    <span className="text-sm font-medium">Make Professional</span>
                                    <span className="text-xs text-muted-foreground">Formal clinical tone</span>
                                </div>
                            </Button>
                            <Button variant="outline" className="justify-start h-auto py-2 px-3 text-left">
                                <div className="flex flex-col items-start gap-0.5">
                                    <span className="text-sm font-medium">Remove Jargon</span>
                                    <span className="text-xs text-muted-foreground">Patient-friendly language</span>
                                </div>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Stats */}
                    <Card className="shadow-sm bg-muted/30">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Reading Score</span>
                                <span className="font-medium">{results.stats.readingScore}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Confidence</span>
                                <span className="font-medium">{(results.stats.confidence * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Est. Read Time</span>
                                <span className="font-medium">4 min</span>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </main >
        </div >
    );
}
