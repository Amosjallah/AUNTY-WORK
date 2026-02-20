"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function JournalPage() {
    const posts = [
        {
            id: "botanical-serums-101",
            title: "The Science of Botanical Serums",
            excerpt: "Discover why plant-based lipids are the key to restoring your skin's natural barrier and luminescence.",
            date: "Feb 15, 2024",
            author: "Dr. Elena Rossi",
            category: "Rituals",
            imageColor: "#F5EFDA"
        },
        {
            id: "evening-skincare-ritual",
            title: "Crafting Your Evening Sanctuary",
            excerpt: "How to turn your nightly skincare routine into a meditative practice for better sleep and brighter skin.",
            date: "Feb 10, 2024",
            author: "Aunty",
            category: "Mindfulness",
            imageColor: "#F2E9E1"
        },
        {
            id: "winter-skin-protection",
            title: "Winter Skin: A Protection Guide",
            excerpt: "Essential tips and ingredients to keep your skin hydrated and glowing during the coldest months of the year.",
            date: "Feb 05, 2024",
            author: "Mark Thompson",
            category: "Education",
            imageColor: "#E5E7EB"
        }
    ];

    return (
        <div className="bg-background pt-24 pb-20">
            <section className="py-20 border-b border-accent/10">
                <div className="container-custom text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block"
                    >
                        Aunty Work Journal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-6"
                    >
                        The Art of <span className="italic font-light text-primary/80">Luminescence</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-foreground/60 text-lg font-light leading-relaxed"
                    >
                        Stories, science, and rituals to guide you on your journey to radiant skin and a mindful life.
                    </motion.p>
                </div>
            </section>

            <section className="py-20 font-sans">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map((post, i) => (
                            <Link key={post.id} href={`/blog/${post.id}`}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div
                                        className="aspect-[16/10] mb-6 overflow-hidden relative rounded-sm"
                                        style={{ backgroundColor: post.imageColor }}
                                    >
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-primary shadow-sm rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                                            <span className="w-1 h-1 bg-accent/30 rounded-full" />
                                            <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                                        </div>

                                        <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                                            {post.title}
                                        </h2>

                                        <p className="text-foreground/60 font-light leading-relaxed text-[15px] line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="pt-2">
                                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-primary group-hover:gap-4 transition-all duration-300">
                                                Read More <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <Button variant="outline" className="px-12 py-6 text-xs uppercase tracking-widest font-bold border-accent/30 rounded-sm">
                            Load More Stories
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Integration */}
            <section className="py-24 bg-accent/5">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-serif font-bold mb-6">Join the Inner Circle</h2>
                        <p className="text-foreground/50 font-light mb-10 max-w-lg mx-auto">Subscribe to receive skincare rituals, early access to new collections, and botanical wisdom directly in your inbox.</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 bg-white border border-accent/20 px-6 py-4 text-sm font-light focus:outline-none focus:border-primary transition-colors rounded-sm"
                            />
                            <Button variant="luxury" className="px-10 py-4 uppercase tracking-widest text-xs font-bold rounded-sm">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
