"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Star, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    category: string;
    rating: number;
    imageColor: string;
    imageUrl?: string;
    isNew?: boolean;
}

export default function ProductCard({
    id,
    name,
    price,
    category,
    rating,
    imageColor,
    imageUrl,
    isNew,
}: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="relative aspect-[3/4] mb-4 bg-accent/5 backdrop-blur-sm overflow-hidden rounded-sm">
                <Link href={`/product/${id}`} className="block w-full h-full">
                    {/* Product Image */}
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div
                            className="w-full h-full transition-transform duration-700 group-hover:scale-110 flex items-center justify-center"
                            style={{ backgroundColor: imageColor }}
                        >
                            <span className="text-foreground/10 font-serif text-xl italic">{name}</span>
                        </div>
                    )}
                </Link>

                {/* Badges */}
                {isNew && (
                    <span className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-primary shadow-sm">
                        New
                    </span>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Button size="icon" variant="luxury" className="rounded-full">
                        <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full bg-white border-none shadow-md">
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-accent fill-accent"
                                }`}
                        />
                    ))}
                    <span className="text-[10px] text-foreground/40 ml-1">({rating})</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-medium">
                    {category}
                </p>
                <Link href={`/product/${id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-serif text-lg font-semibold">{name}</h3>
                </Link>
                <p className="text-primary font-medium font-sans">${price.toFixed(2)}</p>
            </div>
        </motion.div>
    );
}
