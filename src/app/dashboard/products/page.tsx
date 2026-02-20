'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Plus,
    Edit,
    Trash2,
    Package,
    Search,
    Filter,
    MoreHorizontal,
    AlertTriangle,
    Eye,
    TrendingUp
} from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function ProductsManagement() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            const { data } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) setProducts(data);
            setLoading(false);
        }

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) {
            setProducts(products.filter(p => p.id !== id));
        } else {
            alert('Error deleting product: ' + error.message);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-neutral-900 font-sans">Product Inventory</h1>
                    <p className="text-sm text-neutral-500">Manage your product catalog and stock levels</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/products/add"
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all font-medium shadow-md shadow-primary/20"
                    >
                        <Plus className="w-5 h-5" /> Add Product
                    </Link>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total SKU</span>
                        <Package className="text-neutral-300" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-neutral-900 font-sans">{products.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Low Stock</span>
                        <AlertTriangle className="text-orange-400" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-neutral-900 font-sans">
                        {products.filter(p => p.stock_quantity <= (p.low_stock_threshold || 10)).length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Best Category</span>
                        <TrendingUp className="text-green-500" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-neutral-900 font-sans">Face Care</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-50 flex flex-col sm:flex-row gap-4 justify-between bg-white">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search catalog..."
                            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50/50 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                                <th className="px-6 py-4">Product Details</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
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
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 flex-shrink-0 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-100 group-hover:border-primary/20 transition-colors">
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                                            <Package size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors">{product.name}</p>
                                                    <p className="text-xs text-neutral-400 font-mono italic">#{product.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">{product.category || 'Uncategorized'}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-neutral-900">${product.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between gap-4 min-w-[80px]">
                                                    <span className={clsx(
                                                        "text-xs font-bold",
                                                        (product.stock_quantity || 0) <= (product.low_stock_threshold || 10) ? "text-orange-600" : "text-neutral-900"
                                                    )}>
                                                        {product.stock_quantity || 0}
                                                    </span>
                                                    <span className="text-[10px] text-neutral-400">/ 100</span>
                                                </div>
                                                <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={clsx(
                                                            "h-full rounded-full transition-all duration-500",
                                                            (product.stock_quantity || 0) <= (product.low_stock_threshold || 10) ? "bg-orange-500" : "bg-primary"
                                                        )}
                                                        style={{ width: `${Math.min(((product.stock_quantity || 0) / 100) * 100, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ring-1 ring-inset",
                                                (product.stock_quantity || 0) > 0 ? "bg-green-50 text-green-700 ring-green-100" : "bg-red-50 text-red-700 ring-red-100"
                                            )}>
                                                {(product.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    onClick={() => router.push(`/dashboard/products/edit/${product.id}`)}
                                                    className="p-2 text-neutral-400 hover:text-primary transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-neutral-400">
                                        <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No products found. Start by adding one!</p>
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
