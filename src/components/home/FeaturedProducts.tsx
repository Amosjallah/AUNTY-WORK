"use client";

import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const products = [
    {
        id: "1",
        name: "Golden Elixir Serum",
        category: "Anti-Aging",
        price: 125.0,
        rating: 4.9,
        imageColor: "#F5EFDA",
        isNew: true,
    },
    {
        id: "2",
        name: "Rose Dew Moisturizer",
        category: "Moisturizers",
        price: 85.0,
        rating: 4.8,
        imageColor: "#F2Dbd5",
    },
    {
        id: "3",
        name: "Pure Silk Cleanser",
        category: "Cleansers",
        price: 45.0,
        rating: 4.7,
        imageColor: "#EBF3F5",
    },
    {
        id: "4",
        name: "Midnight Renew Cream",
        category: "Repair",
        price: 110.0,
        rating: 5.0,
        imageColor: "#E5E5E5",
        isNew: true,
    },
];

export default function FeaturedProducts() {
    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-primary font-medium tracking-[0.3em] uppercase mb-4 block text-sm"
                        >
                            Curated Excellence
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                            Best Sellers <br />
                            <span className="italic text-foreground/60">Most Wanted Botanicals</span>
                        </h2>
                    </div>
                    <Button variant="link" size="lg" className="px-0 h-auto">
                        View All Products
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
