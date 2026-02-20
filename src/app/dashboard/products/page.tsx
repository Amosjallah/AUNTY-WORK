'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

export default function ProductsManagement() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkAdminAndFetch() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profile?.role !== 'admin') {
                router.push('/');
                return;
            }

            setIsAdmin(true);
            const { data: productsData } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (productsData) setProducts(productsData);
            setLoading(false);
        }

        checkAdminAndFetch();
    }, [router]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (!error) {
            setProducts(products.filter(p => p.id !== id));
        } else {
            alert('Error deleting product: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                        ← Dashboard
                    </Link>
                    <h1 className="text-4xl font-serif">Product Management</h1>
                </div>
                <Link
                    href="/dashboard/products/add"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:opacity-90 transition-all font-medium"
                >
                    <Plus className="w-5 h-5" /> Add New Product
                </Link>
            </div>

            <div className="bg-card rounded-3xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30 border-b">
                                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                                ) : (
                                                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                                                        <Package className="w-6 h-6 text-muted-foreground" />
                                                    </div>
                                                )}
                                                <span className="font-medium">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 capitalize">{product.category}</td>
                                        <td className="px-6 py-4">${product.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => router.push(`/dashboard/products/edit/${product.id}`)}
                                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
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
