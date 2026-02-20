"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function Hero() {
    const [settings, setSettings] = useState<Record<string, string>>({
        hero_title: "Reveal Your Natural Glow",
        hero_tag: "Organic & Ethical Skincare",
        hero_subtitle: "Luxury skincare formulated with rare botanicals to nourish your soul and rejuvenate your skin. Experience the Aunty Work difference."
    });

    useEffect(() => {
        async function fetchSettings() {
            const { data } = await supabase
                .from('site_settings')
                .select('*')
                .in('key', ['hero_title', 'hero_tag', 'hero_subtitle']);

            if (data) {
                const s: Record<string, string> = {};
                data.forEach(item => s[item.key] = item.value);
                setSettings(prev => ({ ...prev, ...s }));
            }
        }
        fetchSettings();
    }, []);

    // Split title by <br /> if present
    const titleParts = settings.hero_title.split('<br />');

    return (
        <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center">
            {/* Background Image Placeholder / Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--secondary)_0%,_transparent_70%)] opacity-30" />
                <div className="absolute inset-0 bg-black/5" />
                <div className="w-full h-full bg-[#F5F0E8] relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
                </div>
            </div>

            <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-xl"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block text-primary font-medium tracking-[0.3em] uppercase mb-6 text-sm"
                    >
                        {settings.hero_tag}
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-[1.1] mb-8">
                        {titleParts[0]} {titleParts.length > 1 && <br />}
                        <span className="italic text-primary">{titleParts[1] || ''}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed font-light">
                        {settings.hero_subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" variant="luxury">
                            Shop Collection
                        </Button>
                    </div>

                    <div className="mt-16 flex items-center gap-8 border-t border-accent/20 pt-8">
                        <div>
                            <p className="font-serif text-2xl font-bold">98%</p>
                            <p className="text-xs uppercase tracking-wider text-foreground/50">Natural Ingredients</p>
                        </div>
                        <div className="w-px h-8 bg-accent" />
                        <div>
                            <p className="font-serif text-2xl font-bold">15k+</p>
                            <p className="text-xs uppercase tracking-wider text-foreground/50">Happy Clients</p>
                        </div>
                        <div className="w-px h-8 bg-accent" />
                        <div>
                            <p className="font-serif text-2xl font-bold">5★</p>
                            <p className="text-xs uppercase tracking-wider text-foreground/50">Product Rating</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative aspect-[4/5] hidden lg:block"
                >
                    <div className="absolute inset-4 border border-primary/20 -z-10 translate-x-4 translate-y-4" />
                    <div className="w-full h-full bg-[#E8DED1] rounded-sm overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-serif text-4xl italic text-center px-8">
                            Aunty Work Essence
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <div className="w-[1px] h-12 bg-primary/30 relative">
                    <div className="w-full h-1/3 bg-primary absolute top-0" />
                </div>
            </motion.div>
        </section>
    );
}
