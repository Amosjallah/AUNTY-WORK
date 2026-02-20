'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import {
    TrendingUp,
    TrendingDown,
    ShoppingBag,
    Users,
    DollarSign,
    AlertTriangle,
    ArrowRight,
    Package,
    Calendar,
    Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function AdminDashboardOverview() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        avgOrderValue: 0,
        lowStockItems: [] as any[],
        recentOrders: [] as any[]
    });

    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true);
            try {
                // 1. Fetch Product Count and Low Stock
                const { data: products } = await supabase
                    .from('products')
                    .select('id, name, stock_quantity, low_stock_threshold');

                const lowStock = products?.filter(p => (p.stock_quantity || 0) <= (p.low_stock_threshold || 10)) || [];

                // 2. Fetch Orders (mocking values since it's a new table)
                const { data: orders } = await supabase
                    .from('orders')
                    .select('*, profiles(full_name)')
                    .order('created_at', { ascending: false })
                    .limit(5);

                // 3. Metadata for stats
                const { count: customerCount } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true });

                setStats({
                    totalRevenue: 12450.00, // Mock for now
                    totalOrders: 156,       // Mock for now
                    totalCustomers: customerCount || 0,
                    avgOrderValue: 79.80,   // Mock for now
                    lowStockItems: lowStock,
                    recentOrders: orders || []
                });
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    const statCards = [
        { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, trend: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
        { title: 'Total Orders', value: stats.totalOrders.toString(), trend: '+8.2%', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Customers', value: stats.totalCustomers.toString(), trend: '+5.4%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Avg Order Value', value: `$${stats.avgOrderValue.toFixed(2)}`, trend: '-2.1%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900">Dashboard Overview</h1>
                    <p className="text-neutral-500 mt-1">Welcome back, Admin. Here is what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
                        <Filter size={16} /> Filters
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={card.title}
                        className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className={clsx("absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform", card.color)}>
                            <card.icon size={64} />
                        </div>
                        <div className="relative z-10">
                            <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-inner", card.bg, card.color)}>
                                <card.icon size={20} />
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 tracking-wide uppercase">{card.title}</h3>
                            <div className="flex items-end justify-between mt-2">
                                <p className="text-2xl font-bold text-neutral-900">{card.value}</p>
                                <span className={clsx(
                                    "flex items-center text-xs font-semibold px-2 py-1 rounded-full",
                                    card.trend.startsWith('+') ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                                )}>
                                    {card.trend.startsWith('+') ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                                    {card.trend}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Dashboard Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Chart Placeholder (Sales Report) */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Sales Reports</h3>
                            <p className="text-sm text-neutral-500">Visual insights into your monthly performance</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-primary/20"></span> Revenue
                            </span>
                        </div>
                    </div>
                    {/* Mock Chart Visualization */}
                    <div className="h-64 flex items-end justify-between gap-1 px-2">
                        {[40, 65, 45, 90, 60, 80, 55, 75, 95, 85, 40, 70].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.05 }}
                                    className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary transition-colors cursor-pointer relative"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        ${(h * 150).toLocaleString()}
                                    </div>
                                </motion.div>
                                <span className="text-[10px] text-neutral-400 font-medium">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notifications / Alerts / Low Stock */}
                <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-neutral-900">Inventory Alerts</h3>
                        <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-orange-100">
                            {stats.lowStockItems.length} Low Stock
                        </span>
                    </div>

                    <div className="space-y-4">
                        {stats.lowStockItems.length > 0 ? (
                            stats.lowStockItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-orange-50/30 rounded-2xl border border-orange-100/50 group hover:bg-orange-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                            <AlertTriangle size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-neutral-900 line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-orange-600 font-medium">{item.stock_quantity} left in stock</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-neutral-400 group-hover:text-primary transition-colors">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center">
                                <div className="inline-flex p-3 bg-green-50 text-green-600 rounded-full mb-3">
                                    <Package size={24} />
                                </div>
                                <p className="text-sm text-neutral-500 font-medium">All stock levels healthy!</p>
                            </div>
                        )}
                    </div>

                    <button className="w-full mt-6 py-3 bg-neutral-50 text-neutral-600 text-sm font-bold rounded-xl hover:bg-neutral-100 transition-colors">
                        View Detailed Inventory
                    </button>
                </div>
            </div>

            {/* Bottom Row - Recent Orders & Top Selling */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Recent Orders Table */}
                <div className="xl:col-span-8 bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-neutral-50 flex items-center justify-between bg-white sticky top-0 z-10">
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Recent Orders</h3>
                            <p className="text-sm text-neutral-500 italic">Latest processing information</p>
                        </div>
                        <button className="text-primary text-sm font-bold hover:underline">
                            View All Orders
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50/50 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                                    <th className="px-8 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-50">
                                {stats.recentOrders.length > 0 ? (
                                    stats.recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors group">
                                            <td className="px-8 py-4 font-mono text-xs text-neutral-500">{order.id.slice(0, 8)}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold uppercase ring-1 ring-primary/20">
                                                        {order.profiles?.full_name?.charAt(0) || 'U'}
                                                    </div>
                                                    <span className="text-sm font-semibold text-neutral-900">{order.profiles?.full_name || 'Anonymous User'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-500">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-neutral-900">
                                                ${order.total_amount?.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={clsx(
                                                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1",
                                                    order.status === 'delivered' ? "bg-green-50 text-green-600 ring-green-100" :
                                                        order.status === 'pending' ? "bg-amber-50 text-amber-600 ring-amber-100" :
                                                            "bg-blue-50 text-blue-600 ring-blue-100"
                                                )}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <button className="text-neutral-400 group-hover:text-primary transition-colors">
                                                    <ArrowRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-16 text-center">
                                            <div className="inline-flex p-4 bg-neutral-100 text-neutral-400 rounded-full mb-4">
                                                <ShoppingBag size={32} />
                                            </div>
                                            <p className="text-neutral-500 font-medium">No recent orders found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Performance / Top Products List */}
                <div className="xl:col-span-4 bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <TrendingUp size={120} />
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-neutral-900">Popular Products</h3>
                        <p className="text-sm text-neutral-500 italic">Top selling items this period</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { name: 'Radiant Glow Serum', sales: 45, revenue: 2160 },
                            { name: 'Honey Cleansing Balm', sales: 38, revenue: 1444 },
                            { name: 'Velvet Skin Cream', sales: 32, revenue: 1920 },
                            { name: 'Nourishing Face Oil', sales: 24, revenue: 1320 },
                        ].map((prod, i) => (
                            <div key={prod.name} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold text-lg group-hover:bg-primary group-hover:text-white transition-all">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-neutral-900 mb-1">{prod.name}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(prod.sales / 50) * 100}%` }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-neutral-400">{prod.sales} Sold</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Total Sales Focus</p>
                        <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                            Your top 3 products account for <span className="text-primary font-bold">65%</span> of total monthly revenue. Consider a bundle promotion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
