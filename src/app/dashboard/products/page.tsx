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
    TrendingUp,
    Upload,
    Trash,
    Grid,
    List,
    ChevronDown,
    Check,
    CheckSquare,
    Square
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

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const toggleSelectAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map(p => p.id));
        }
    };

    const toggleSelectProduct = (id: string) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(pId => pId !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Products</h1>
                    <p className="text-neutral-500 mt-1">Manage your product catalog and inventory</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-700 font-semibold text-sm hover:bg-neutral-50 transition-all shadow-sm">
                        <Upload size={18} /> Import
                    </button>
                    <Link
                        href="/dashboard/products/add"
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all font-semibold text-sm shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={18} /> Add Product
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-500/20">
                        <Trash size={18} /> Clear all products
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <p className="text-sm font-medium text-neutral-500 mb-1">Total Products</p>
                    <p className="text-3xl font-bold text-neutral-900">{products.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <p className="text-sm font-medium text-neutral-500 mb-1">Active</p>
                    <p className="text-3xl font-bold text-blue-600">{products.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <p className="text-sm font-medium text-neutral-500 mb-1">Low Stock</p>
                    <p className="text-3xl font-bold text-orange-600">
                        {products.filter(p => p.stock_quantity <= (p.low_stock_threshold || 10)).length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <p className="text-sm font-medium text-neutral-500 mb-1">Out of Stock</p>
                    <p className="text-3xl font-bold text-red-600">
                        {products.filter(p => (p.stock_quantity || 0) === 0).length}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search products by name, SKU, or category..."
                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-2xl text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm">
                            <Filter size={18} /> Filters
                        </button>
                        <div className="relative">
                            <button className="flex items-center gap-4 px-5 py-3 bg-white border border-neutral-200 rounded-2xl text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm min-w-[160px] justify-between">
                                Newest First <ChevronDown size={18} />
                            </button>
                        </div>
                        <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                            <button className="p-2.5 bg-blue-600 text-white"><List size={18} /></button>
                            <button className="p-2.5 bg-white text-neutral-400 hover:text-neutral-600"><Grid size={18} /></button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50/50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold border-b border-neutral-100">
                                <th className="px-6 py-5 w-12">
                                    <button onClick={toggleSelectAll} className="text-neutral-400 hover:text-blue-600">
                                        {selectedProducts.length === filteredProducts.length && filteredProducts.length > 0 ? <CheckSquare size={20} /> : <Square size={20} />}
                                    </button>
                                </th>
                                <th className="px-6 py-5">Product</th>
                                <th className="px-6 py-5">SKU</th>
                                <th className="px-6 py-5">Category</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Stock</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
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
                                    <tr key={product.id} className={clsx("hover:bg-blue-50/10 transition-colors group border-b border-neutral-50 last:border-0", selectedProducts.includes(product.id) && "bg-blue-50/20")}>
                                        <td className="px-6 py-5">
                                            <button onClick={() => toggleSelectProduct(product.id)} className={clsx("transition-colors", selectedProducts.includes(product.id) ? "text-blue-600" : "text-neutral-300 hover:text-blue-400")}>
                                                {selectedProducts.includes(product.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 flex-shrink-0 bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-100 group-hover:border-blue-200 transition-colors">
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                                            <Package size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors lowercase first-letter:uppercase">{product.name}</p>
                                                    <p className="text-[11px] text-neutral-400 mt-0.5">ID: {product.id.slice(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs font-medium text-neutral-500 lowercase uppercase">Auralux-{product.sku || product.id.slice(0, 4).toUpperCase()}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-medium text-neutral-600">{product.category || 'Skin Care'}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-neutral-900">GH₵ {product.price}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-semibold text-neutral-700">{product.stock_quantity || 0}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={clsx(
                                                "inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider",
                                                (product.stock_quantity || 0) > 0 ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                                            )}>
                                                {(product.stock_quantity || 0) > 0 ? 'Active' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => router.push(`/dashboard/products/edit/${product.id}`)}
                                                    className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
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
