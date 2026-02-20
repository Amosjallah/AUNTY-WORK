"use client";

import { useState } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    // Helper to get a consistent color for placeholders based on the product ID
    const getPlaceholderColor = (id: string) => {
        const colors = ["#F5EFDA", "#F2E9E1", "#E5E7EB", "#FDE2E4"];
        const index = id.length % colors.length;
        return colors[index];
    };

    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            {/* Shop Hero */}
            <section className="py-16 md:py-24 border-b border-accent/10">
                <div className="container-custom text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block"
                    >
                        Our Collection
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-6"
                    >
                        Curated Skincare Rituals
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-foreground/60 text-lg font-light leading-relaxed"
                    >
                        Explore our range of botanical-infused products designed to nourish your skin
                        and elevate your daily self-care routine.
                    </motion.p>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-[72px] z-30 bg-background/80 backdrop-blur-md border-b border-accent/10 py-6">
                <div className="container-custom flex flex-wrap justify-center gap-4 md:gap-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={clsx(
                                "text-xs uppercase tracking-widest font-bold transition-all duration-300 relative py-2",
                                activeCategory === category ? "text-primary" : "text-foreground/40 hover:text-foreground"
                            )}
                        >
                            {category}
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    category={product.category}
                                    rating={product.rating}
                                    imageColor={getPlaceholderColor(product.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-32">
                            <p className="text-xl font-serif italic text-foreground/40">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
