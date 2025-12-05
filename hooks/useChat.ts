
import { useState } from 'react';

export function useChat(jobId: string) {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string; sources?: string[] }[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (message: string) => {
        setMessages((prev) => [...prev, { role: 'user', content: message }]);
        setLoading(true);

        try {
            const res = await fetch('/api/mock/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobId, message }),
            });
            const data = await res.json();

            setMessages((prev) => [...prev, { role: 'ai', content: data.reply, sources: data.sources }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { role: 'ai', content: "Sorry, I couldn't process that." }]);
        } finally {
            setLoading(false);
        }
    };

    return { messages, sendMessage, loading };
}
