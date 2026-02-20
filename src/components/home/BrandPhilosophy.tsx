"use client";

import { motion } from "framer-motion";
import { Leaf, Award, ShieldCheck, Heart } from "lucide-react";

const principles = [
    {
        icon: Leaf,
        title: "Pure Botanical Mix",
        description: "Every formula starts with high-potency plants and rare botanical extracts.",
    },
    {
        icon: Award,
        title: "Proven Results",
        description: "Scientifically tested to deliver visible improvements in skin radiance.",
    },
    {
        icon: ShieldCheck,
        title: "Modern Science",
        description: "Bridging the gap between age-old beauty rituals and clinical science.",
    },
    {
        icon: Heart,
        title: "Kind to Skin",
        description: "Gentle enough for the most sensitive souls, powerful enough to transform.",
    },
];

export default function BrandPhilosophy() {
    return (
        <section className="py-24 bg-[#F9F7F2]">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {principles.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 bg-white border border-accent/10 shadow-sm"
                                >
                                    <item.icon className="w-8 h-8 text-primary mb-6 stroke-[1.5px]" />
                                    <h4 className="text-xl font-serif font-bold mb-4">{item.title}</h4>
                                    <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-[0.3em] uppercase mb-4 block text-sm"
                        >
                            The TOUCHEEGLOW Way
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                            Beauty is the <br />
                            <span className="italic">Reflection</span> of Self-Care
                        </h2>
                        <p className="text-lg text-foreground/70 mb-8 leading-relaxed font-light">
                            We believe that skincare is more than just a routine—it's a moment of connection with yourself. Our products are designed to turn your bathroom into a sanctuary, and your skin into a radiant canvas.
                        </p>
                        <blockquote className="border-l-2 border-primary pl-8 italic text-lg text-foreground/60 mb-8 py-2">
                            "TOUCHEEGLOW transformed my morning ritual into a luxury experience I actually look forward to."
                            <footer className="mt-4 text-sm font-sans font-bold not-italic uppercase tracking-widest">— Touchee G., Founder</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}
