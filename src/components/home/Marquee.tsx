"use client";

import { motion } from "framer-motion";

const brands = [
    "Cruelty Free",
    "Vegan Formula",
    "Paraben Free",
    "Eco-Friendly Packaging",
    "Dermatologically Tested",
    "Sustainably Sourced",
];

export default function Marquee() {
    return (
        <div className="py-6 border-y border-accent/20 bg-secondary/30 overflow-hidden relative">
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
                className="flex gap-20 whitespace-nowrap px-10"
            >
                {[...brands, ...brands, ...brands].map((brand, i) => (
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
