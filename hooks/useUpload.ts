
import { useState } from 'react';

export function useUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFile = async (file: File, metadata: any) => {
        setIsUploading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('metadata', JSON.stringify(metadata));

            const res = await fetch('/api/mock/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            return data.jobId;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadFile, isUploading, error };
}
