'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import {
    Megaphone,
    Plus,
    Trash2,
    Calendar,
    Tag,
    Percent,
    DollarSign,
    ToggleRight,
    ToggleLeft
} from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function MarketingPage() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCoupons() {
            setLoading(true);
            const { data } = await supabase
                .from('coupons')
                .select('*')
                .order('created_at', { ascending: false });
            setCoupons(data || []);
            setLoading(false);
        }
        fetchCoupons();
    }, []);

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('coupons')
            .update({ active: !currentStatus })
            .eq('id', id);

        if (!error) {
            setCoupons(coupons.map(c => c.id === id ? { ...c, active: !currentStatus } : c));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-neutral-900 font-sans">Marketing & Coupons</h1>
                    <p className="text-sm text-neutral-500">Manage promotions and discount codes</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
                    <Plus size={16} /> Create New Coupon
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Promotions summary */}
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                        <Megaphone size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Active Promo Codes</h3>
                    <p className="text-2xl font-bold text-neutral-900 mt-1">{coupons.filter(c => c.active).length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                        <Tag size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Total Coupons Used</h3>
                    <p className="text-2xl font-bold text-neutral-900 mt-1">245</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm text-center flex flex-col items-center justify-center border-dashed border-primary/30 bg-primary/5">
                    <p className="text-primary text-sm font-bold">Launch a new campaign today!</p>
                    <p className="text-neutral-500 text-xs mt-1 italic">Drives 15% more traffic on average</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50/50 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                                <th className="px-6 py-4">Coupon Code</th>
                                <th className="px-6 py-4">Discount</th>
                                <th className="px-6 py-4">Min. Order</th>
                                <th className="px-6 py-4">Expires</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-6 py-4 h-16 bg-neutral-50/20"></td>
                                    </tr>
                                ))
                            ) : coupons.length > 0 ? (
                                coupons.map((coupon) => (
                                    <tr key={coupon.id} className="hover:bg-neutral-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-neutral-100 rounded-lg font-mono text-sm font-bold text-neutral-900 border border-neutral-200 uppercase">{coupon.code}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                                                {coupon.discount_type === 'percentage' ? (
                                                    <><Percent size={14} className="text-primary" /> {coupon.discount_value}%</>
                                                ) : (
                                                    <><DollarSign size={14} className="text-primary" /> ${coupon.discount_value}</>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-500">
                                            ${coupon.min_order_amount || 0}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-500">
                                            {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'Never'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStatus(coupon.id, coupon.active)}
                                                className={clsx(
                                                    "transition-colors",
                                                    coupon.active ? "text-green-500" : "text-neutral-300"
                                                )}
                                            >
                                                {coupon.active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="inline-flex p-4 bg-neutral-50 text-neutral-300 rounded-full mb-4">
                                            <Megaphone size={40} />
                                        </div>
                                        <p className="text-neutral-500 font-medium">No active coupons found.</p>
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
