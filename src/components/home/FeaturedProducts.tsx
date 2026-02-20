"use client";

import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function FeaturedProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .limit(4);

            if (data) {
                const mappedProducts = data.map(p => ({
                    id: p.id,
                    name: p.name,
                    category: p.category,
                    price: p.price,
                    rating: p.rating,
                    imageUrl: p.image_url,
                    imageColor: p.image_color || "#F5F5F5",
                    isNew: true // Placeholder
                }));
                setProducts(mappedProducts);
            }
            setLoading(false);
        }
        fetchProducts();
    }, []);

    if (loading) return null;
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
