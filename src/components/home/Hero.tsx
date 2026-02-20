"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ChevronRight, BadgeCheck, Truck, Star } from "lucide-react";

const HERO_IMAGE =
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1920&q=80";

const trustBadges = [
    {
        icon: Truck,
        title: "Direct Import",
        sub: "FROM PREMIUM SOURCES",
    },
    {
        icon: BadgeCheck,
        title: "Verified Quality",
        sub: "EVERY ITEM CHECKED",
    },
    {
        icon: Star,
        title: "Best Prices",
        sub: "WHOLESALE & RETAIL",
    },
];

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: "92vh" }}>
            {/* ── Background Image ── */}
            <div className="absolute inset-0 z-0">
                <img
                    src={HERO_IMAGE}
                    alt="Luxury skincare boutique"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />
                {/* gradient overlay — bottom-heavy so trust badges are readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
            </div>

            {/* ── STORE NAME BADGE (top-center) ── */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-6 pointer-events-none"
            >
                <div className="border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-1.5 rounded-sm">
                    <span className="text-white text-xs font-bold tracking-[0.35em] uppercase">
                        Touchée Glow Essence
                    </span>
                </div>
            </motion.div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[92vh] px-4 pb-28 pt-24">
                {/* Eyebrow label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-white/80 text-xs font-bold tracking-[0.4em] uppercase mb-5"
                >
                    Fashion Hero
                </motion.p>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
                    className="text-white font-serif leading-[1.08] mb-6 max-w-3xl"
                    style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
                >
                    Exquisite Skincare
                    <br />
                    Collection
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-white/75 text-base md:text-lg max-w-lg mb-10 leading-relaxed"
                >
                    Luxury botanicals &amp; rare extracts — bold results, perfect
                    formulas, unbeatable radiance.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <Link
                        href="/shop"
                        className="flex items-center gap-2 bg-white text-neutral-900 font-bold text-sm px-8 py-3.5 rounded-full hover:bg-neutral-100 transition-colors shadow-xl"
                    >
                        <ShoppingBag size={18} />
                        Shop Collection
                    </Link>
                    <Link
                        href="/shop"
                        className="flex items-center gap-2 border border-white/60 text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        View All
                        <ChevronRight size={16} />
                    </Link>
                </motion.div>
            </div>

            {/* ── PROMO BADGE (bottom-left) ── */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute bottom-28 sm:bottom-20 left-4 sm:left-10 z-20 bg-white rounded-2xl shadow-2xl px-5 py-4 max-w-[160px]"
            >
                <p className="text-primary text-xs font-semibold italic mb-0.5">Exclusive Offer</p>
                <p className="text-neutral-900 text-3xl font-extrabold leading-none">25% Off</p>
                <p className="text-neutral-500 text-[11px] mt-1 leading-tight">On your first order.</p>
                <Link
                    href="/shop"
                    className="mt-2 inline-block text-primary text-xs font-bold underline hover:no-underline"
                >
                    Shop now
                </Link>
            </motion.div>

            {/* ── TRUST BADGES (bottom strip) ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-0 border-t border-white/10 backdrop-blur-sm bg-black/30"
            >
                {trustBadges.map((badge, i) => (
                    <div
                        key={badge.title}
                        className={`flex flex-col items-center py-4 px-6 flex-1 max-w-xs ${i < trustBadges.length - 1 ? "border-r border-white/10" : ""
                            }`}
                    >
                        <badge.icon size={20} className="text-white/70 mb-1.5" />
                        <p className="text-white text-sm font-bold leading-tight">{badge.title}</p>
                        <p className="text-white/50 text-[10px] tracking-widest mt-0.5 uppercase font-medium">
                            {badge.sub}
                        </p>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
