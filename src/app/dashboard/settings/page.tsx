'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import {
    Settings,
    Save,
    Globe,
    Bell,
    Shield,
    Palette,
    CreditCard,
    Layout,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function SiteSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('General');
    const router = useRouter();

    useEffect(() => {
        async function fetchSettings() {
            setLoading(true);
            const { data } = await supabase.from('site_settings').select('*');
            if (data) {
                const settingsObj: Record<string, string> = {};
                data.forEach(s => { settingsObj[s.key] = s.value; });
                setSettings(settingsObj);
            }
            setLoading(false);
        }
        fetchSettings();
    }, []);

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = Object.entries(settings).map(([key, value]) => ({
                key,
                value,
                updated_at: new Date().toISOString()
            }));

            for (const update of updates) {
                await supabase.from('site_settings').upsert(update);
            }
            // Mock delay for UX
            await new Promise(r => setTimeout(r, 800));
        } catch (err) {
            console.error('Error saving settings:', err);
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { name: 'General', icon: Globe },
        { name: 'Appearance', icon: Palette },
        { name: 'Notifications', icon: Bell },
        { name: 'Security', icon: Shield },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="animate-spin h-12 w-12 text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-neutral-900 font-sans">System Settings</h1>
                    <p className="text-sm text-neutral-500">Configure your store's global preferences and branding</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Navigation Menu */}
                <div className="md:col-span-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                activeTab === tab.name
                                    ? "bg-white text-primary shadow-sm ring-1 ring-neutral-200"
                                    : "text-neutral-500 hover:bg-neutral-100"
                            )}
                        >
                            <tab.icon size={18} className={clsx("transition-transform", activeTab === tab.name ? "scale-110" : "group-hover:scale-110")} />
                            {tab.name}
                            {activeTab === tab.name && (
                                <motion.div layoutId="active-tab" className="ml-auto w-1 h-4 bg-primary rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="md:col-span-3 space-y-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'General' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-8"
                            >
                                <div className="space-y-6">
                                    <div className="border-b border-neutral-50 pb-4">
                                        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                                            <Globe size={18} className="text-primary" /> Store Information
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Store Name</label>
                                            <input
                                                type="text"
                                                value={settings.store_name || 'Toucheé Glow'}
                                                onChange={(e) => handleChange('store_name', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Support Email</label>
                                            <input
                                                type="email"
                                                value={settings.support_email || 'hello@touchee-glow.com'}
                                                onChange={(e) => handleChange('support_email', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Hero Title</label>
                                        <input
                                            type="text"
                                            value={settings.hero_title || ''}
                                            onChange={(e) => handleChange('hero_title', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-serif italic text-lg"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'Appearance' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-8"
                            >
                                <div className="space-y-6">
                                    <div className="border-b border-neutral-50 pb-4">
                                        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                                            <Palette size={18} className="text-secondary" /> Branding & Aesthetics
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Primary Color</label>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-primary shadow-inner"></div>
                                                <input
                                                    type="text"
                                                    value="#D4AF37"
                                                    className="flex-1 px-4 py-2 border border-neutral-200 rounded-xl text-sm font-mono"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Secondary Color</label>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-neutral-900 shadow-inner"></div>
                                                <input
                                                    type="text"
                                                    value="#171717"
                                                    className="flex-1 px-4 py-2 border border-neutral-200 rounded-xl text-sm font-mono"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
