"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { supabase } from "@/utils/supabase";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Check authentication state
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsLoggedIn(true);
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();
                setUserRole(profile?.role || 'user');
            } else {
                setIsLoggedIn(false);
                setUserRole(null);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setIsLoggedIn(true);
                checkAuth(); // Re-fetch profile
            } else {
                setIsLoggedIn(false);
                setUserRole(null);
            }
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    const navLinks = [
        { name: "Shop", href: "/shop" },
        { name: "Best Sellers", href: "/shop?category=best-sellers" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    if (userRole === 'admin') {
        navLinks.push({ name: "Dashboard", href: "/dashboard" });
    }

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans",
                isScrolled || isMobileMenuOpen ? "bg-background/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Mobile Menu Button - Left */}
                <button
                    className="md:hidden p-2 -ml-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Logo - Center on mobile, Left on desktop */}
                <div className="flex-1 md:flex-none text-center md:text-left">
                    <Link href="/" className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-foreground uppercase">
                        TOUCHEEGLOW
                    </Link>
                </div>

                {/* Desktop Navigation - Center */}
                <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                "text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-foreground/80"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons - Right */}
                <div className="flex items-center gap-4 md:gap-6 justify-end flex-1 md:flex-none">
                    <button className="hidden md:block hover:text-primary transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    {isLoggedIn ? (
                        <div className="hidden md:flex items-center gap-4">
                            {userRole === 'admin' && (
                                <Link href="/dashboard" className="hover:text-primary transition-colors">
                                    <LayoutDashboard className="w-5 h-5" />
                                </Link>
                            )}
                            <button
                                onClick={async () => {
                                    await supabase.auth.signOut();
                                    setUserRole(null);
                                    setIsLoggedIn(false);
                                }}
                                className="hover:text-primary transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link href="/auth" className="hidden md:block hover:text-primary transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                    )}

                    <Link href="/cart" className="hover:text-primary transition-colors relative">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                            0
                        </span>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-accent md:hidden overflow-hidden shadow-lg"
                    >
                        <nav className="flex flex-col p-6 gap-4 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium hover:text-primary py-2 capitalize"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-accent w-full justify-center">
                                <button className="flex flex-col items-center gap-1 text-xs uppercase tracking-wider hover:text-primary">
                                    <Search className="w-6 h-6" /> Search
                                </button>

                                {isLoggedIn ? (
                                    <>
                                        {userRole === 'admin' && (
                                            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-xs uppercase tracking-wider hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                                                <LayoutDashboard className="w-6 h-6" /> Admin
                                            </Link>
                                        )}
                                        <button
                                            onClick={async () => {
                                                await supabase.auth.signOut();
                                                setIsLoggedIn(false);
                                                setUserRole(null);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex flex-col items-center gap-1 text-xs uppercase tracking-wider hover:text-primary"
                                        >
                                            <LogOut className="w-6 h-6" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link href="/auth" className="flex flex-col items-center gap-1 text-xs uppercase tracking-wider hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                                        <User className="w-6 h-6" /> Login
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
