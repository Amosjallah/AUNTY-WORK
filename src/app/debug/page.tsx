'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';

export default function DebugPage() {
    const [status, setStatus] = useState<any>({
        env: {
            url: 'checking...',
            key: 'checking...',
        },
        connection: 'checking...',
        error: null,
    });

    useEffect(() => {
        const checkConnection = async () => {
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            const newStatus: any = {
                env: {
                    url: url ? `Present (${url.substring(0, 12)}...)` : 'MISSING',
                    key: key ? `Present (${key.substring(0, 8)}...)` : 'MISSING',
                },
                connection: 'Connecting...',
                error: null,
            };

            try {
                const { data, error } = await supabase.from('site_settings').select('key').limit(1);
                if (error) throw error;
                newStatus.connection = 'SUCCESSFUL';
                newStatus.data = data;
            } catch (err: any) {
                newStatus.connection = 'FAILED';
                newStatus.error = err.message || JSON.stringify(err);
            }

            setStatus(newStatus);
        };

        checkConnection();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-8 font-mono">
            <h1 className="text-2xl font-bold mb-6">Supabase Diagnostics</h1>

            <div className="space-y-4">
                <section className="p-4 bg-gray-50 rounded-lg border">
                    <h2 className="font-semibold mb-2">Environment Variables</h2>
                    <p>NEXT_PUBLIC_SUPABASE_URL: <span className={status.env.url === 'MISSING' ? 'text-red-600' : 'text-green-600'}>{status.env.url}</span></p>
                    <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: <span className={status.env.key === 'MISSING' ? 'text-red-600' : 'text-green-600'}>{status.env.key}</span></p>
                </section>

                <section className={`p-4 rounded-lg border ${status.connection === 'SUCCESSFUL' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <h2 className="font-semibold mb-2">Supabase Connection</h2>
                    <p>Status: <span className="font-bold">{status.connection}</span></p>
                    {status.error && (
                        <div className="mt-2 p-2 bg-white rounded border border-red-100 text-sm text-red-600 overflow-auto max-h-40">
                            {status.error}
                        </div>
                    )}
                </section>

                <div className="text-xs text-gray-500 mt-8">
                    <p>Note: This page is for diagnostic purposes only. Remove before final production deployment if it contains sensitive info.</p>
                </div>
            </div>
        </div>
    );
}
