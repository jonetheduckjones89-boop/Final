"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
    onFilesSelected: (files: File[]) => void;
    maxFiles?: number;
}

export function FileUploader({ onFilesSelected, maxFiles = 5 }: FileUploaderProps) {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => {
            const newFiles = [...prev, ...acceptedFiles].slice(0, maxFiles);
            onFilesSelected(newFiles);
            return newFiles;
        });
    }, [maxFiles, onFilesSelected]);

    // Simple drag and drop implementation without extra lib if possible, 
    // but for robustness let's assume we might need react-dropzone.
    // Since I didn't install react-dropzone, I will implement a simple native one.

    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            handleDrop(droppedFiles);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            handleDrop(selectedFiles);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => {
            const newFiles = prev.filter((_, i) => i !== index);
            onFilesSelected(newFiles);
            return newFiles;
        });
    };

    return (
        <div className="w-full space-y-4">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-3",
                    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                )}
                onClick={() => document.getElementById("file-upload")?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={onFileChange}
                    accept=".pdf,.docx,.txt"
                />
                <div className="p-4 rounded-full bg-muted">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PDF, DOCX, TXT (max 10MB)</p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-primary/10">
                                    <FileText className="h-4 w-4 text-primary" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-muted-foreground text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeFile(index); }}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
