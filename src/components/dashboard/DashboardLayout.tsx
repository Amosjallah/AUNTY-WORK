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
    Bell,
    User,
    Tablet,
    Folder,
    MessageCircle,
    Package,
    LineChart,
    Ticket,
    MessageSquareText,
    BoxSelect,
    ChevronLeft,
    ChevronRight,
    Search as SearchIcon
} from 'lucide-react';
import { supabase } from '@/utils/supabase';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'POS System', href: '/dashboard/pos', icon: Tablet },
    { name: 'Products', href: '/dashboard/products', icon: Box },
    { name: 'Categories', href: '/dashboard/categories', icon: Folder },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Reviews', href: '/dashboard/reviews', icon: MessageCircle },
    { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
    { name: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
    { name: 'Coupons', href: '/dashboard/coupons', icon: Ticket },
    { name: 'SMS Debugger', href: '/dashboard/sms', icon: MessageSquareText },
    { name: 'Modules', href: '/dashboard/modules', icon: BoxSelect },
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
                    <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-100 bg-white">
                        <Link href="/dashboard" className={clsx("flex items-center gap-2 font-bold text-xl tracking-tight transition-opacity", !isSidebarOpen && "lg:opacity-0")}>
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                                <Box size={20} />
                            </div>
                            <span className="text-neutral-900">Auralux</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto no-scrollbar">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative truncate",
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                                    )}
                                >
                                    <item.icon size={20} className={clsx("flex-shrink-0", isActive ? "text-blue-600" : "text-neutral-400 group-hover:text-neutral-900")} />
                                    <span className={clsx("font-medium text-sm transition-opacity duration-300", !isSidebarOpen && "lg:opacity-0 lg:w-0")}>
                                        {item.name}
                                    </span>
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
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-neutral-500 hover:bg-neutral-50 hover:text-red-500 transition-colors group"
                        >
                            <LogOut size={20} className="flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                            <span className={clsx("font-medium text-sm", !isSidebarOpen && "lg:hidden")}>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 sm:px-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="relative p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-50 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-2 group cursor-pointer hover:bg-neutral-50 p-1.5 pr-4 rounded-full transition-colors">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                {adminUser?.profile?.full_name?.charAt(0) || 'A'}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-neutral-900 leading-none mb-1">{adminUser?.profile?.full_name || 'Admin'}</p>
                                <p className="text-xs text-neutral-500 leading-none lowercase">{adminUser?.email || 'admin@auralux.com'}</p>
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
