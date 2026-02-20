import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#F9F7F2] pt-20 pb-10 border-t border-accent/20">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-serif font-bold mb-6 italic tracking-tight">TOUCHEEGLOW</h3>
                        <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                            Clean, effective, and luxurious skin care designed to reveal your natural radiance. Ethically sourced and scientifically proven.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-white border border-accent hover:border-primary hover:text-primary transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white border border-accent hover:border-primary hover:text-primary transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white border border-accent hover:border-primary hover:text-primary transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-serif font-semibold text-lg mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-foreground/70">
                            <li><Link href="/shop/cleansers" className="hover:text-primary transition-colors">Cleansers</Link></li>
                            <li><Link href="/shop/serums" className="hover:text-primary transition-colors">Serums</Link></li>
                            <li><Link href="/shop/moisturizers" className="hover:text-primary transition-colors">Moisturizers</Link></li>
                            <li><Link href="/shop/sun-care" className="hover:text-primary transition-colors">Sun Care</Link></li>
                            <li><Link href="/shop/sets" className="hover:text-primary transition-colors">Gift Sets</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-serif font-semibold text-lg mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-foreground/70">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                            <li><Link href="/ingredients" className="hover:text-primary transition-colors">Ingredients</Link></li>
                            <li><Link href="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif font-semibold text-lg mb-6">Stay Radiant</h4>
                        <p className="text-foreground/70 text-sm mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex flex-col gap-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-white border border-accent px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                            <button className="bg-foreground text-background px-6 py-3 text-sm font-medium uppercase tracking-wide hover:bg-primary transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-accent/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
                    <p>&copy; {new Date().getFullYear()} TOUCHEEGLOW Skin Care. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
