'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import {
    ShoppingBag,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Truck,
    CheckCircle,
    XCircle,
    Download
} from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            const { data } = await supabase
                .from('orders')
                .select('*, profiles(full_name, email)')
                .order('created_at', { ascending: false });
            setOrders(data || []);
            setLoading(false);
        }
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'processing': return 'bg-blue-100 text-blue-700';
            case 'shipped': return 'bg-purple-100 text-purple-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-amber-100 text-amber-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-neutral-900 font-sans">Order Management</h1>
                    <p className="text-sm text-neutral-500">Track and process your customer orders</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm">
                    <Download size={16} /> Export Orders
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-50 flex flex-col sm:flex-row gap-4 justify-between bg-white">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search by ID, name, or email..."
                            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
                            <Filter size={14} /> All Status
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50/50 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-6 py-4 h-16 bg-neutral-50/20"></td>
                                    </tr>
                                ))
                            ) : filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-neutral-500">#{order.id.slice(0, 8)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-neutral-900">{order.profiles?.full_name || 'Guest User'}</span>
                                                <span className="text-xs text-neutral-500">{order.profiles?.email}</span>
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
                                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                getStatusColor(order.status)
                                            )}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-neutral-400 hover:text-primary transition-colors" title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-2 text-neutral-400 hover:text-blue-500 transition-colors" title="Mark as Shipped">
                                                    <Truck size={18} />
                                                </button>
                                                <button className="p-2 text-neutral-400 hover:text-green-500 transition-colors" title="Complete Order">
                                                    <CheckCircle size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="inline-flex p-4 bg-neutral-50 text-neutral-300 rounded-full mb-4">
                                            <ShoppingBag size={40} />
                                        </div>
                                        <p className="text-neutral-500 font-medium">No orders found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
