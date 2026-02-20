'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';

export default function SiteSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [settings, setSettings] = useState<Record<string, string>>({});
    const router = useRouter();

    useEffect(() => {
        async function checkAdminAndFetch() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profile?.role !== 'admin') {
                router.push('/');
                return;
            }

            setIsAdmin(true);

            // Fetch settings
            const { data: settingsData } = await supabase
                .from('site_settings')
                .select('*');

            if (settingsData) {
                const settingsObj: Record<string, string> = {};
                settingsData.forEach(s => {
                    settingsObj[s.key] = s.value;
                });
                setSettings(settingsObj);
            }
            setLoading(false);
        }

        checkAdminAndFetch();
    }, [router]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const updates = Object.entries(settings).map(([key, value]) => ({
            key,
            value,
            updated_at: new Date().toISOString()
        }));

        for (const { key, value } of updates) {
            await supabase
                .from('site_settings')
                .upsert({ key, value, updated_at: new Date().toISOString() });
        }

        setSaving(false);
        alert('Settings saved successfully!');
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin h-12 w-12 text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>

            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-serif">Home Page Settings</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-12">
                <section className="bg-card p-8 rounded-3xl border shadow-sm">
                    <h2 className="text-2xl font-serif mb-6 border-b pb-4">Hero Section</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Hero Tag</label>
                            <input
                                type="text"
                                value={settings.hero_tag || ''}
                                onChange={(e) => handleChange('hero_tag', e.target.value)}
                                className="w-full bg-transparent border-b border-accent focus:border-primary py-2 outline-none transition-colors text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Hero Title</label>
                            <input
                                type="text"
                                value={settings.hero_title || ''}
                                onChange={(e) => handleChange('hero_title', e.target.value)}
                                className="w-full bg-transparent border-b border-accent focus:border-primary py-2 outline-none transition-colors text-2xl font-serif"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Hero Subtitle</label>
                            <textarea
                                value={settings.hero_subtitle || ''}
                                onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                                className="w-full bg-transparent border border-accent rounded-xl p-4 focus:border-primary outline-none transition-colors h-32 resize-none"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-card p-8 rounded-3xl border shadow-sm">
                    <h2 className="text-2xl font-serif mb-6 border-b pb-4">Promotional Bar</h2>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Marquee Text</label>
                        <textarea
                            value={settings.marquee_text || ''}
                            onChange={(e) => handleChange('marquee_text', e.target.value)}
                            className="w-full bg-transparent border border-accent rounded-xl p-4 focus:border-primary outline-none transition-colors h-24 resize-none"
                            placeholder="Use ' — ' to separate items"
                        />
                    </div>
                </section>
            </form>
        </div>
    );
}
