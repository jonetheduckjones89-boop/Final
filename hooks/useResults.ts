
import { useState, useEffect } from 'react';

export function useResults(jobId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!jobId) return;

        const fetchResults = async () => {
            try {
                const res = await fetch(`/api/mock/results?jobId=${jobId}`);
                if (!res.ok) throw new Error('Failed to fetch results');
                const json = await res.json();
                setData(json);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [jobId]);

    return { data, loading, error };
}
