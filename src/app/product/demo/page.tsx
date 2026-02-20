"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Star, Minus, Plus, Heart, Share2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductPage() {
    const [quantity, setQuantity] = useState(1);

    const product = {
        name: "Golden Elixir Serum",
        price: 125.0,
        description: "Our signature serum is a potent blend of rare botanicals and skin-identical lipids. Designed to penetrate deep into the dermis, it restores elasticity and reveals a radiant, healthy glow from within.",
        ingredients: "Squalane, Rosehip Oil, Bakuchiol, Gold Leaf, Vitamin E, Lavender Stem Cells.",
        usage: "Apply 3-5 drops onto clean, damp skin morning and night. Gently press into face and neck for optimal absorption.",
        features: [
            { icon: ShieldCheck, text: "Dermatologically Tested" },
            { icon: Truck, text: "Free Express Shipping" },
            { icon: RotateCcw, text: "30-Day Ritual Guarantee" },
        ]
    };

    return (
        <div className="bg-background pb-24">
            <div className="container-custom pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square bg-[#F5EFDA] flex items-center justify-center relative overflow-hidden group"
                        >
                            <span className="text-foreground/20 font-serif text-4xl italic">{product.name}</span>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-accent/10 cursor-pointer hover:border-primary border border-transparent transition-all" />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/40 mb-6">
                            <a href="/" className="hover:text-primary transition-colors">Home</a>
                            <span>/</span>
                            <a href="/shop" className="hover:text-primary transition-colors">Serums</a>
                            <span>/</span>
                            <span className="text-foreground/80">{product.name}</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                ))}
                                <span className="text-sm font-medium ml-2">4.9 (124 reviews)</span>
                            </div>
                            <div className="w-px h-4 bg-accent" />
                            <span className="text-primary font-bold text-2xl font-serif">${product.price.toFixed(2)}</span>
                        </div>

                        <p className="text-lg text-foreground/70 mb-8 leading-relaxed font-light">
                            {product.description}
                        </p>

                        <div className="space-y-6 mb-10 pb-10 border-b border-accent/20">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold uppercase tracking-widest">Quantity</span>
                                <div className="flex items-center border border-accent">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-accent/5 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-accent/5 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button size="lg" variant="luxury" className="flex-1">
                                    Add to Ritual
                                </Button>
                                <Button size="lg" variant="outline" className="px-5">
                                    <Heart className="w-5 h-5" />
                                </Button>
                                <Button size="lg" variant="outline" className="px-5">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            {product.features.map((feature, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-2">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tabs / Details */}
                        <div className="space-y-6">
                            <details className="group border-b border-accent/20 pb-4" open>
                                <summary className="list-none flex justify-between items-center cursor-pointer font-serif font-bold text-lg">
                                    Ingredients
                                    <Plus className="w-5 h-5 group-open:rotate-45 transition-transform" />
                                </summary>
                                <p className="mt-4 text-sm text-foreground/60 leading-relaxed font-light">
                                    {product.ingredients}
                                </p>
                            </details>
                            <details className="group border-b border-accent/20 pb-4">
                                <summary className="list-none flex justify-between items-center cursor-pointer font-serif font-bold text-lg">
                                    How to Use
                                    <Plus className="w-5 h-5 group-open:rotate-45 transition-transform" />
                                </summary>
                                <p className="mt-4 text-sm text-foreground/60 leading-relaxed font-light">
                                    {product.usage}
                                </p>
                            </details>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
