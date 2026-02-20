'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Box,
    Tag,
    ShoppingBag,
    Users,
    Megaphone,
    Settings,
    Menu,
    X,
    LogOut,
    Search,
    Bell,
    User
} from 'lucide-react';
import { supabase } from '@/utils/supabase';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/dashboard/products', icon: Box },
    { name: 'Categories', href: '/dashboard/categories', icon: Tag },
    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Marketing', href: '/dashboard/marketing', icon: Megaphone },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminUser, setAdminUser] = useState<any>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/auth');
                return;
            }

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error || profile?.role !== 'admin') {
                router.push('/');
            } else {
                setIsAdmin(true);
                setAdminUser({ ...user, profile });
            }
            setLoading(false);
        }

        checkAdmin();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-vh-100 bg-background text-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-neutral-50 flex font-sans">
            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out lg:static lg:block",
                    isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"
                )}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-100">
                        <Link href="/dashboard" className={clsx("font-serif font-bold text-xl tracking-tight uppercase transition-opacity", !isSidebarOpen && "lg:opacity-0")}>
                            Touchee<span className="text-primary italic">Glow</span>
                        </Link>
                        <button
                            className="lg:hidden p-2 text-neutral-500 hover:text-neutral-900"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                                        isActive
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "text-neutral-600 hover:bg-neutral-100"
                                    )}
                                >
                                    <item.icon size={20} className={clsx("transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
                                    <span className={clsx("font-medium whitespace-nowrap", !isSidebarOpen && "lg:hidden")}>
                                        {item.name}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute right-2 w-1 h-6 bg-white/40 rounded-full lg:hidden"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-neutral-100">
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                router.push('/');
                            }}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 hover:bg-red-50 hover:text-red-500 transition-colors group"
                        >
                            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className={clsx("font-medium", !isSidebarOpen && "lg:hidden")}>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 lg:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full border border-neutral-200">
                            <Search size={16} className="text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="bg-transparent border-none text-sm focus:ring-0 w-48 xl:w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <button className="relative p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-px bg-neutral-200 hidden sm:block"></div>

                        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-neutral-900 leading-none">{adminUser?.profile?.full_name || 'Admin'}</p>
                                <p className="text-xs text-neutral-500 mt-1 uppercase tracking-tight">System Admin</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-inner ring-2 ring-white">
                                {adminUser?.profile?.full_name?.charAt(0) || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
