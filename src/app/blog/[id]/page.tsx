"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            const { data } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setPost({
                    ...data,
                    imageColor: data.image_color
                });
            }
            setLoading(false);
        }
        fetchPost();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-serif italic text-foreground/40 text-xl">Loading Article...</div>;

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
                <p className="text-foreground/60 mb-8 max-w-md">This entry in the journal does not exist or has been removed from our archives.</p>
                <Button variant="luxury" onClick={() => router.push("/blog")}>
                    Back to Journal
                </Button>
            </div>
        );
    }

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
