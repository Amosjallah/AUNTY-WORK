'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import {
    Users,
    Search,
    Mail,
    Calendar,
    UserPlus,
    MoreVertical,
    ShieldCheck
} from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchCustomers() {
            setLoading(true);
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .order('updated_at', { ascending: false });
            setCustomers(data || []);
            setLoading(false);
        }
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(customer =>
        customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-neutral-900 font-sans">Customer Management</h1>
                    <p className="text-sm text-neutral-500">View and manage your client base</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
                    <UserPlus size={16} /> Add New Customer
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-50 bg-white">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50/50 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined At</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-4 h-16 bg-neutral-50/20"></td>
                                    </tr>
                                ))
                            ) : filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-neutral-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-primary font-bold overflow-hidden border border-neutral-200">
                                                    {customer.avatar_url ? (
                                                        <img src={customer.avatar_url} alt={customer.full_name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{customer.full_name?.charAt(0) || 'U'}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-neutral-900">{customer.full_name || 'Anonymous User'}</span>
                                                    <span className="text-xs text-neutral-500">{customer.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                customer.role === 'admin' ? "bg-primary/10 text-primary" : "bg-neutral-100 text-neutral-600"
                                            )}>
                                                {customer.role === 'admin' && <ShieldCheck size={12} />}
                                                {customer.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-500">
                                            {new Date(customer.updated_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-neutral-900">-</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-neutral-400 hover:text-primary transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="inline-flex p-4 bg-neutral-50 text-neutral-300 rounded-full mb-4">
                                            <Users size={40} />
                                        </div>
                                        <p className="text-neutral-500 font-medium">No customers found.</p>
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
