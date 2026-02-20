"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Mail } from "lucide-react";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // Mock post data - in a real app, this would come from a data file or CMS
    const posts = {
        "botanical-serums-101": {
            title: "The Science of Botanical Serums",
            date: "Feb 15, 2024",
            author: "Dr. Elena Rossi",
            category: "Rituals",
            imageColor: "#F5EFDA",
            content: `
                <p>Botanical serums represent the pinnacle of clean beauty, merging the ancient wisdom of herbalism with the precision of modern dermatological science. At Aunty Work, we believe that the skin is a living ecosystem that thrives best when nourished with ingredients it recognizes as its own.</p>
                
                <h2>Why Plant-Based Lipids?</h2>
                <p>Unlike synthetic emollients that merely sit on the surface of the skin, plant-based lipids possess a molecular structure remarkably similar to our skin's natural sebum. This allows them to integrate seamlessly into the skin's barrier, delivering deep hydration without clogging pores.</p>
                
                <p>Ingredients like Jojoba oil, Rosehip seed, and Sea Buckthorn are rich in essential fatty acids and antioxidants. These compounds work to neutralize free radicals—unstable molecules caused by environmental pollutants and UV exposure that accelerate the visible signs of aging.</p>
                
                <blockquote>"The most powerful laboratory is nature herself. We are simply its students, refining its gifts into rituals."</blockquote>
                
                <h2>The Ritual of Application</h2>
                <p>To maximize the efficacy of your botanical serum, application is as important as the ingredients themselves. We recommend the following steps:</p>
                <ul>
                    <li>Warm 3-4 drops between the palms of your hands.</li>
                    <li>Gently press into clean, damp skin.</li>
                    <li>Use upward strokes to encourage lymphatic drainage.</li>
                </ul>
                
                <p>By making this a mindful part of your morning and evening routine, you're not just applying a product—you're honoring your skin's natural rhythm.</p>
            `
        },
        "evening-skincare-ritual": {
            title: "Crafting Your Evening Sanctuary",
            date: "Feb 10, 2024",
            author: "Aunty Work",
            category: "Mindfulness",
            imageColor: "#F2E9E1",
            content: `
                <p>Your evening skincare routine is more than just a task to be completed before bed; it is an opportunity to transition from the noise of the day into the stillness of the night.</p>
                
                <h2>Creating the Environment</h2>
                <p>Start by dimming the lights. Light a candle with notes of lavender or sandalwood. The olfactory sense is a direct gateway to the nervous system, and these scents signal to your brain that it's time to rest.</p>
                
                <h2>The Double Cleanse</h2>
                <p>The first step in any truly effective evening ritual is the double cleanse. Use an oil-based cleanser first to remove SPF and pollutants, followed by a gentle water-based cleanser to deeply purify the pores.</p>
                
                <p>As you massage the products into your skin, focus on your breath. Inhale for four counts, exhale for six. Feel the tension leaving your jaw and your shoulders.</p>
            `
        }
    };

    const post = posts[id as keyof typeof posts] || {
        title: id?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || "Untitled Post",
        date: "Feb 20, 2024",
        author: "Lumière Team",
        category: "Journal",
        imageColor: "#F5F5F5",
        content: "<p>The story of this botanical journey is yet to be told. Check back soon for more wisdom and rituals.</p>"
    };

    return (
        <div className="bg-background pt-24 pb-24">
            <div className="container-custom pt-12">
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.push('/blog')}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 hover:text-primary transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Journal
                </motion.button>

                <article className="max-w-4xl mx-auto">
                    <header className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-accent/10 px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest text-primary rounded-full mb-8 inline-block"
                        >
                            {post.category}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-center gap-6 text-[11px] uppercase tracking-widest text-foreground/50 font-bold border-y border-accent/10 py-6"
                        >
                            <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                            <span className="w-1.5 h-1.5 bg-accent/30 rounded-full" />
                            <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {post.author}</span>
                        </motion.div>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="aspect-[21/9] w-full bg-[#F5EFDA] mb-16 rounded-sm relative overflow-hidden"
                        style={{ backgroundColor: post.imageColor }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-serif italic text-foreground/10 text-4xl tracking-[0.2em] uppercase p-10 text-center">{post.title}</span>
                        </div>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar/Share */}
                        <aside className="lg:w-16 flex lg:flex-col items-center gap-6 border-r border-accent/5 pr-8 hidden lg:flex">
                            <span className="text-[9px] uppercase tracking-widest font-black text-foreground/20 rotate-180 [writing-mode:vertical-lr]">Share Ritual</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-accent/10 hover:border-primary hover:text-primary transition-all duration-300">
                                <Facebook className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-accent/10 hover:border-primary hover:text-primary transition-all duration-300">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-accent/10 hover:border-primary hover:text-primary transition-all duration-300">
                                <Mail className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-accent/10 hover:border-primary hover:text-primary transition-all duration-300">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </aside>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex-1 prose prose-serif max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-foreground/70 prose-p:font-light prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-primary/70 prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-8"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </article>

                {/* Newsletter Box */}
                <div className="max-w-4xl mx-auto mt-24 p-12 bg-accent/5 rounded-sm text-center border border-accent/10">
                    <h3 className="text-2xl font-serif font-bold mb-4">Never miss a ritual</h3>
                    <p className="text-foreground/50 font-light mb-8 max-w-lg mx-auto italic">Join our Luminary community to receive weekly wisdom on botanical skin care and mindful living.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="flex-1 bg-white border border-accent/20 px-6 py-4 text-sm font-light focus:outline-none focus:border-primary transition-colors rounded-sm shadow-inner"
                        />
                        <Button variant="luxury" className="px-10 uppercase tracking-widest text-[10px] font-bold">Subscribe</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
