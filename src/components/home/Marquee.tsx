"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function Marquee() {
    const [brands, setBrands] = useState<string[]>([
        "Cruelty Free",
        "Vegan Formula",
        "Paraben Free",
        "Eco-Friendly Packaging",
        "Dermatologically Tested",
        "Sustainably Sourced",
    ]);

    useEffect(() => {
        async function fetchSettings() {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'marquee_text')
                .single();

            if (data?.value) {
                setBrands(data.value.split(' — '));
            }
        }
        fetchSettings();
    }, []);

    return (
        <div className="py-6 border-y border-accent/20 bg-secondary/30 overflow-hidden relative">
            <motion.div
                animate={{ x: [0, -2000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 60,
                        ease: "linear",
                    },
                }}
                className="flex gap-20 whitespace-nowrap px-10"
            >
                {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
                    <span
                        key={i}
                        className="text-xs uppercase tracking-[0.4em] font-medium text-foreground/60 flex items-center gap-4"
                    >
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {brand}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
