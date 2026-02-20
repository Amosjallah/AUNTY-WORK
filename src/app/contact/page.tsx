"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-background pt-24 pb-20">
            {/* Header Section */}
            <section className="py-20 border-b border-accent/10">
                <div className="container-custom text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-6"
                    >
                        How can we <span className="italic font-light text-primary/80">help?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-foreground/60 text-lg font-light leading-relaxed"
                    >
                        Whether you have a question about our botanical rituals, need assistance with an order, or just want to say hello, we're here for you.
                    </motion.p>
                </div>
            </section>

            <section className="py-24 font-sans">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-serif font-bold mb-8">Send us a Message</h2>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Jane Doe"
                                            className="w-full bg-accent/5 border border-accent/10 px-6 py-4 text-sm font-light focus:outline-none focus:border-primary transition-colors rounded-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="jane@example.com"
                                            className="w-full bg-accent/5 border border-accent/10 px-6 py-4 text-sm font-light focus:outline-none focus:border-primary transition-colors rounded-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-1">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Order Inquiry / Product Question"
                                        className="w-full bg-accent/5 border border-accent/10 px-6 py-4 text-sm font-light focus:outline-none focus:border-primary transition-colors rounded-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-1">Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us more about how we can help..."
                                        className="w-full bg-accent/5 border border-accent/10 px-6 py-4 text-sm font-light focus:outline-none focus:border-primary transition-colors rounded-sm resize-none"
                                    ></textarea>
                                </div>
                                <Button variant="luxury" className="w-full py-4 uppercase tracking-[0.2em] text-xs font-bold rounded-sm shadow-md">
                                    Send Message
                                </Button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col justify-center"
                        >
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold mb-8">Our Studio</h2>
                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-primary shrink-0">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 mb-1">Visit Us</h4>
                                                <p className="text-foreground/70 font-light leading-relaxed">
                                                    123 Botanical Avenue, Suite 400<br />
                                                    Paris, France 75001
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-primary shrink-0">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 mb-1">Email Us</h4>
                                                <p className="text-foreground/70 font-light">hello@toucheeglow.com</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-primary shrink-0">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 mb-1">Call Us</h4>
                                                <p className="text-foreground/70 font-light">+33 (0) 1 23 45 67 89</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-serif font-bold mb-6">Socials</h2>
                                    <div className="flex gap-4">
                                        {[
                                            { icon: Instagram, label: "Instagram" },
                                            { icon: Facebook, label: "Facebook" },
                                            { icon: Twitter, label: "Twitter" }
                                        ].map((social, i) => (
                                            <button
                                                key={i}
                                                className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-300"
                                                aria-label={social.label}
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] w-full bg-accent/5 mt-10 relative overflow-hidden grayscale opacity-60">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif italic text-foreground/20 text-xl tracking-widest uppercase">Studio Map Preview</span>
                </div>
            </section>
        </div>
    );
}
