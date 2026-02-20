"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
    // Mock cart items
    const [cartItems, setCartItems] = useState([
        {
            id: "rose-glow-serum",
            name: "Rose Glow Serum",
            price: 85.00,
            quantity: 1,
            category: "Rituals",
            imageColor: "#F5EFDA"
        }
    ]);

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 150 ? 0 : 15.00;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-serif font-bold mb-6">Your Ritual Bag is Empty</h1>
                    <p className="text-foreground/50 font-light mb-10 max-w-sm mx-auto leading-relaxed">It seems you haven't selected any treatments yet. Begin your skincare journey in our shop.</p>
                    <Link href="/shop">
                        <Button variant="luxury" className="px-12 py-6 uppercase tracking-widest text-xs font-bold rounded-sm shadow-md">
                            Discover Collection
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-background pt-32 pb-24 font-sans">
            <div className="container-custom">
                <header className="mb-12 flex items-end justify-between border-b border-accent/10 pb-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-serif font-bold mb-2"
                        >
                            Your Ritual Bag
                        </motion.h1>
                        <p className="text-foreground/40 font-bold uppercase tracking-[0.2em] text-[10px]">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} selected</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Items List */}
                    <div className="lg:col-span-8 space-y-8">
                        {cartItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-6 pb-8 border-b border-accent/10 items-center"
                            >
                                <div
                                    className="w-24 h-24 sm:w-32 sm:h-32 bg-[#F5EFDA] rounded-sm shrink-0 flex items-center justify-center overflow-hidden relative"
                                    style={{ backgroundColor: item.imageColor }}
                                >
                                    <span className="text-[10px] uppercase font-bold text-foreground/20 text-center px-4">{item.name}</span>
                                </div>

                                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60">{item.category}</span>
                                        <h3 className="text-xl font-serif font-bold">{item.name}</h3>
                                        <p className="text-sm font-light text-foreground/50">Each order includes signature eco-lux packaging.</p>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center border border-accent/30 rounded-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-2 hover:bg-accent/5 transition-colors"
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-2 hover:bg-accent/5 transition-colors"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="text-right min-w-[80px]">
                                            <span className="font-serif font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-foreground/30 hover:text-red-400 transition-colors p-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest pt-4"
                        >
                            <ArrowLeft className="w-4 h-4" /> Continue Exploring
                        </Link>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="bg-accent/5 p-8 rounded-sm border border-accent/10 sticky top-32">
                            <h2 className="text-2xl font-serif font-bold mb-8">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-foreground/60 font-light">Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-foreground/60 font-light">Eco-Shipping</span>
                                    <span className="font-medium">{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[10px] text-primary/60 italic">Free shipping on orders over $150.00</p>
                                )}
                                <div className="pt-4 border-t border-accent/10 flex justify-between">
                                    <span className="font-serif font-bold text-lg">Total</span>
                                    <span className="font-serif font-bold text-2xl text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button variant="luxury" className="w-full py-6 rounded-sm uppercase tracking-[0.2em] text-[11px] font-bold shadow-lg shadow-primary/10 mb-8">
                                Proceed to Checkout
                            </Button>

                            <div className="space-y-6 pt-6 border-t border-accent/10">
                                <div className="flex items-center gap-4 text-foreground/50">
                                    <ShieldCheck className="w-5 h-5 shrink-0" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Secure Transactions</span>
                                </div>
                                <div className="flex items-center gap-4 text-foreground/50">
                                    <Truck className="w-5 h-5 shrink-0" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Complimentary Packaging</span>
                                </div>
                                <div className="flex items-center gap-4 text-foreground/50">
                                    <CreditCard className="w-5 h-5 shrink-0" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Afterpay Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
