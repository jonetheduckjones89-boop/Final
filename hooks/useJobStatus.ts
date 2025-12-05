
import { useState, useEffect } from 'react';

export function useJobStatus(jobId: string | null) {
    const [status, setStatus] = useState<'processing' | 'processed' | 'failed'>('processing');
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (!jobId) return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/mock/status?jobId=${jobId}`);
                const data = await res.json();

                setStatus(data.status);
                setPercent(data.percent);

                if (data.status === 'processed' || data.status === 'failed') {
                    clearInterval(interval);
                }
            } catch (e) {
                console.error("Failed to poll status", e);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [jobId]);

    return { status, percent };
}
