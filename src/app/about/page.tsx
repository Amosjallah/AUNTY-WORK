"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ShieldCheck, Leaf, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
    const router = useRouter();

    const values = [
        {
            icon: Leaf,
            title: "Ethically Sourced",
            description: "We work directly with small-scale farmers to ensure every botanical is harvested with respect for the earth and local communities."
        },
        {
            icon: ShieldCheck,
            title: "Scientific Integrity",
            description: "Each formula is rigorously tested by dermatologists to ensure maximum efficacy without compromising on safety or gentleness."
        },
        {
            icon: Heart,
            title: "Kind to All",
            description: "Lumière is, and always will be, 100% cruelty-free and vegan. We believe beauty should never come at the expense of another."
        },
        {
            icon: Sparkles,
            title: "Radical Transparency",
            description: "No hidden fillers or synthetic fragrances. We provide a full breakdown of every ingredient and why it's in your bottle."
        }
    ];

    return (
        <div className="bg-background pt-24 pb-20">
            {/* Header Section */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -z-10 rounded-l-[100px]" />
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block"
                        >
                            Our Origin
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight"
                        >
                            Beauty Born from <br />
                            <span className="italic font-light">Natural Wisdom</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-foreground/60 font-light leading-relaxed mb-10"
                        >
                            Lumière was founded on a simple realization: the modern world is fast, but beauty requires patience.
                            We returned to the origins of botanical healing to create a sanctuary for your skin.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-20 bg-accent/5">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-square bg-[#F5EFDA] rounded-sm flex items-center justify-center overflow-hidden"
                        >
                            <span className="text-foreground/10 font-serif text-6xl italic text-center px-12 italic">The Art of Slow Beauty</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">A New Standard of Purity</h2>
                            <div className="space-y-6 text-foreground/70 font-light leading-relaxed">
                                <p>
                                    In an era of synthetic shortcuts, we choose the path of integrity. Every Lumière product
                                    begins with cold-pressed oils and wild-harvested resins, processed in small batches
                                    to preserve their molecular potency.
                                </p>
                                <p>
                                    We don't just care about what goes into our bottles; we care about the ritual of applying
                                    it. Our textures are designed to engage the senses, turning a mundane routine into a
                                    moment of mindfulness.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What We Stand For</h2>
                        <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
                        <p className="text-foreground/50 font-light">Our commitments to you, your skin, and the planet we share.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                                    <value.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-foreground/60 font-light text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-foreground group relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700" />
                <div className="container-custom relative text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Begin Your Ritual Today</h2>
                    <p className="text-white/60 mb-10 max-w-xl mx-auto font-light italic">Experience the transformative power of nature, refined by science.</p>
                    <Button
                        size="lg"
                        variant="luxury"
                        className="bg-white text-foreground hover:bg-white/90 border-none px-12"
                        onClick={() => router.push("/shop")}
                    >
                        Explore Collection
                    </Button>
                </div>
            </section>
        </div>
    );
}
