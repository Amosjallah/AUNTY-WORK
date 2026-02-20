'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter, useParams } from 'next/navigation';
import {
    Upload,
    X,
    Save,
    AlertCircle,
    Loader2,
    ArrowLeft,
    Info,
    BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function EditProductPage() {
    const params = useParams();
    const productId = params.id as string;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        category: 'cleansers',
        description: '',
        long_description: '',
        ingredients: '',
        usage: '',
        image_url: '',
        stock_quantity: '0',
        low_stock_threshold: '10',
    });

    useEffect(() => {
        async function fetchData() {
            const { data: product, error: fetchError } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (fetchError) {
                setError('Product not found');
            } else if (product) {
                setFormData({
                    id: product.id,
                    name: product.name,
                    price: product.price?.toString() || '',
                    category: product.category || 'cleansers',
                    description: product.description || '',
                    long_description: product.long_description || '',
                    ingredients: product.ingredients || '',
                    usage: product.usage || '',
                    image_url: product.image_url || '',
                    stock_quantity: product.stock_quantity?.toString() || '0',
                    low_stock_threshold: product.low_stock_threshold?.toString() || '10',
                });
                if (product.image_url) setImagePreview(product.image_url);
            }
            setLoading(false);
        }
        fetchData();
    }, [productId]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => { setImagePreview(reader.result as string); };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            let image_url = formData.image_url;

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `products/${fileName}`;
                const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, imageFile);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(filePath);
                image_url = publicUrl;
            }

            const { error: updateError } = await supabase
                .from('products')
                .update({
                    name: formData.name,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    description: formData.description,
                    long_description: formData.long_description,
                    ingredients: formData.ingredients,
                    usage: formData.usage,
                    image_url,
                    stock_quantity: parseInt(formData.stock_quantity),
                    low_stock_threshold: parseInt(formData.low_stock_threshold),
                    updated_at: new Date().toISOString(),
                })
                .eq('id', productId);

            if (updateError) throw updateError;
            router.push('/dashboard/products');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="animate-spin w-12 h-12 text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-neutral-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-neutral-900 font-sans">Edit Product</h1>
                        <p className="text-sm text-neutral-500 font-mono italic">#{formData.id}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => router.back()} className="px-6 py-2.5 border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {saving ? 'Saving...' : 'Update Product'}
                    </button>
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3"
                >
                    <AlertCircle size={20} />
                    <p className="text-sm font-medium">{error}</p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                            <Info size={18} className="text-primary" /> Product Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Product Name</label>
                                <input name="name" required value={formData.name} onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Product ID (Slug)</label>
                                <input name="id" disabled value={formData.id}
                                    className="w-full px-4 py-2.5 bg-neutral-100 text-neutral-400 border-none rounded-xl text-sm font-mono cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Short Description</label>
                            <textarea name="description" required rows={2} value={formData.description} onChange={handleInputChange}
                                className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Long Description</label>
                            <textarea name="long_description" rows={5} value={formData.long_description} onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Ingredients</label>
                                <textarea name="ingredients" rows={4} value={formData.ingredients} onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">How to Use</label>
                                <textarea name="usage" rows={4} value={formData.usage} onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Image */}
                    <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm space-y-4">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Product Imagery</label>
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-50 border-2 border-dashed border-neutral-200 group hover:border-primary/30 hover:bg-neutral-100 transition-all">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <button type="button"
                                        onClick={() => { setImageFile(null); setImagePreview(null); setFormData(p => ({ ...p, image_url: '' })); }}
                                        className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-neutral-400 group-hover:text-primary transition-colors">
                                        <Upload size={24} />
                                    </div>
                                    <span className="mt-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Upload Image</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-50 pb-4">
                            <BarChart3 size={18} className="text-secondary" /> Inventory Details
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Price ($)</label>
                                <input name="price" type="number" step="0.01" required value={formData.price} onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-neutral-100 rounded-xl text-lg font-bold text-neutral-900 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none outline-none">
                                    <option value="cleansers">Cleansers</option>
                                    <option value="serums">Serums</option>
                                    <option value="moisturizers">Moisturizers</option>
                                    <option value="masks">Masks</option>
                                    <option value="best-sellers">Best Sellers</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Stock Qty</label>
                                    <input name="stock_quantity" type="number" value={formData.stock_quantity} onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Low Level</label>
                                    <input name="low_stock_threshold" type="number" value={formData.low_stock_threshold} onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
