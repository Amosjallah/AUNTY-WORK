'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/');
                return;
            }

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (error || profile?.role !== 'admin') {
                setIsAdmin(false);
            } else {
                setIsAdmin(true);
            }
            setLoading(false);
        }

        checkAdmin();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h1 className="text-4xl font-serif mb-4">Access Denied</h1>
                <p className="text-muted-foreground mb-8">You do not have permission to view this page.</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-serif">Admin Dashboard</h1>
                <div className="flex gap-4 items-center">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        Admin Verified
                    </span>
                    <button
                        onClick={async () => {
                            await supabase.auth.signOut();
                            router.push('/');
                        }}
                        className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-card p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow cursor-default">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Total Products</h3>
                    <p className="text-3xl font-serif">4</p>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow cursor-default">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Site Users</h3>
                    <p className="text-3xl font-serif">1</p>
                </div>
                <button
                    onClick={() => router.push('/dashboard/settings')}
                    className="bg-primary/5 p-6 rounded-2xl shadow-sm border border-primary/20 hover:bg-primary/10 transition-all text-left"
                >
                    <h3 className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">Edit Home Page</h3>
                    <p className="text-lg font-serif italic">Customize Content →</p>
                </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border rounded-3xl bg-secondary/20">
                    <h2 className="text-2xl font-serif mb-4 text-foreground">Manage Inventory</h2>
                    <p className="text-muted-foreground mb-6">Add, edit, or remove products from your catalog.</p>
                    <button className="text-primary font-medium hover:underline">View All Products →</button>
                </div>
            </div>
        </div>
    );
}
