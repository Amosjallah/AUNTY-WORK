"use client";

import { useState, useEffect } from "react";
import { products, Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Star, Minus, Plus, Heart, Share2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";

export default function DynamicProductPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
        } else if (id !== "demo") {
            // Redirect or show not found - for now just keep as null
            // In a real app, you might redirect to /shop or /404
        }
        setIsLoading(false);
    }, [id]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center font-serif italic text-foreground/40 text-xl">Loading Ritual...</div>;
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-serif font-bold mb-4">Product Not Found</h1>
                <p className="text-foreground/60 mb-8 max-w-md">The skincare ritual you are looking for does not exist or has been archived.</p>
                <Button variant="luxury" onClick={() => router.push("/shop")}>
                    Back to Collection
                </Button>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="bg-background pb-24 pt-24">
            <div className="container-custom pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square bg-[#F5EFDA] flex items-center justify-center relative overflow-hidden group rounded-sm"
                        >
                            <span className="text-foreground/20 font-serif text-4xl italic text-center px-8">{product.name}</span>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-accent/10 cursor-pointer hover:border-primary border border-transparent transition-all rounded-sm" />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-6">
                            <button onClick={() => router.push("/")} className="hover:text-primary transition-colors">Home</button>
                            <span className="text-[8px] opacity-30">/</span>
                            <button onClick={() => router.push("/shop")} className="hover:text-primary transition-colors">{product.category}</button>
                            <span className="text-[8px] opacity-30">/</span>
                            <span className="text-foreground/80">{product.name}</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-accent fill-accent"}`} />
                                ))}
                                <span className="text-xs font-bold uppercase tracking-widest ml-2">{product.rating} ({product.reviews} reviews)</span>
                            </div>
                            <div className="w-px h-4 bg-accent/20" />
                            <span className="text-primary font-bold text-2xl font-serif">${product.price.toFixed(2)}</span>
                        </div>

                        <p className="text-lg text-foreground/70 mb-8 leading-relaxed font-light">
                            {product.longDescription}
                        </p>

                        <div className="space-y-6 mb-10 pb-10 border-b border-accent/20">
                            <div className="flex items-center gap-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">Quantity</span>
                                <div className="flex items-center border border-accent/30 rounded-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-accent/5 transition-colors"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-accent/5 transition-colors"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button size="lg" variant="luxury" className="flex-1 shadow-md hover:shadow-lg transition-all rounded-sm">
                                    Add to Ritual
                                </Button>
                                <Button size="lg" variant="outline" className="px-5 border-accent/30 rounded-sm">
                                    <Heart className="w-5 h-5 text-foreground/60" />
                                </Button>
                                <Button size="lg" variant="outline" className="px-5 border-accent/30 rounded-sm">
                                    <Share2 className="w-5 h-5 text-foreground/60" />
                                </Button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            {product.features.map((feature, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-2">
                                    <feature.icon className="w-6 h-6 text-primary/70" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tabs / Details */}
                        <div className="space-y-4">
                            <details className="group border-b border-accent/10 pb-4" open>
                                <summary className="list-none flex justify-between items-center cursor-pointer font-serif font-bold text-lg hover:text-primary transition-colors">
                                    Ingredients
                                    <Plus className="w-4 h-4 group-open:rotate-45 transition-transform" />
                                </summary>
                                <div className="overflow-hidden">
                                    <p className="mt-4 text-[13px] text-foreground/60 leading-relaxed font-light">
                                        {product.ingredients}
                                    </p>
                                </div>
                            </details>
                            <details className="group border-b border-accent/10 pb-4">
                                <summary className="list-none flex justify-between items-center cursor-pointer font-serif font-bold text-lg hover:text-primary transition-colors">
                                    How to Use
                                    <Plus className="w-4 h-4 group-open:rotate-45 transition-transform" />
                                </summary>
                                <div className="overflow-hidden">
                                    <p className="mt-4 text-[13px] text-foreground/60 leading-relaxed font-light">
                                        {product.usage}
                                    </p>
                                </div>
                            </details>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32">
                        <div className="flex items-end justify-between mb-12 border-b border-accent/10 pb-6">
                            <div>
                                <h2 className="text-3xl font-serif font-bold">Complete the Ritual</h2>
                                <p className="text-foreground/40 font-light mt-2 uppercase tracking-[0.2em] text-[10px] font-bold">Recommended pairings for your skin</p>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-xs uppercase tracking-widest font-bold mb-1" onClick={() => router.push("/shop")}>
                                View All
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    name={p.name}
                                    price={p.price}
                                    category={p.category}
                                    rating={p.rating}
                                    imageColor="#F5EFDA"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
