'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import {
    Upload,
    X,
    Save,
    AlertCircle,
    ArrowLeft,
    Package,
    Info,
    BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function AddProductPage() {
    const [loading, setLoading] = useState(false);
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
        stock_quantity: '0',
        low_stock_threshold: '10',
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'name' && !prev.id) {
                newData.id = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let image_url = '';

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `products/${fileName}`;
                const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, imageFile);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(filePath);
                image_url = publicUrl;
            }

            const { error: insertError } = await supabase
                .from('products')
                .insert([{
                    ...formData,
                    price: parseFloat(formData.price),
                    stock_quantity: parseInt(formData.stock_quantity),
                    low_stock_threshold: parseInt(formData.low_stock_threshold),
                    image_url: image_url || undefined,
                    rating: 0,
                    reviews_count: 0,
                    features: [],
                }]);

            if (insertError) throw insertError;
            router.push('/dashboard/products');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
                        <h1 className="text-2xl font-serif font-bold text-neutral-900 font-sans">New Product</h1>
                        <p className="text-sm text-neutral-500">Create a new entry in your luxury catalog</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2.5 border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={18} />}
                        Publish Product
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
                                <input
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="e.g. Honey Cleansing Balm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Product ID (Slug)</label>
                                <input
                                    name="id"
                                    required
                                    value={formData.id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-mono text-neutral-500"
                                    placeholder="honey-cleansing-balm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Short Description</label>
                            <textarea
                                name="description"
                                required
                                rows={2}
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="A captivating summary for the product card..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Long Description</label>
                            <textarea
                                name="long_description"
                                rows={5}
                                value={formData.long_description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Detailed story, benefits, and results..."
                            />
                        </div>
                    </div>

                    {/* Features & Details */}
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Ingredients</label>
                                <textarea
                                    name="ingredients"
                                    rows={4}
                                    value={formData.ingredients}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    placeholder="List key components..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">How to Use</label>
                                <textarea
                                    name="usage"
                                    rows={4}
                                    value={formData.usage}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    placeholder="Application steps..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Media */}
                    <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm space-y-4">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Product Imagery</label>
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-50 border-2 border-dashed border-neutral-200 group hover:border-primary/30 hover:bg-neutral-100 transition-all pointer-events-auto">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => { setImageFile(null); setImagePreview(null); }}
                                        className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-neutral-400 group-hover:text-primary transition-colors">
                                        <Upload size={24} />
                                    </div>
                                    <span className="mt-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Upload Master Image</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Inventory & Pricing */}
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-50 pb-4">
                            <BarChart3 size={18} className="text-secondary" /> Inventory Details
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Price ($)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-neutral-100 rounded-xl text-lg font-bold text-neutral-900 focus:ring-2 focus:ring-primary/20 outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="space-y-2 text-xs text-neutral-500 mb-6 bg-neutral-50 p-3 rounded-xl italic">
                                Final listed price on the store.
                            </div>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-neutral-50">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none outline-none"
                                >
                                    <option value="cleansers">Cleansers</option>
                                    <option value="serums">Serums</option>
                                    <option value="moisturizers">Moisturizers</option>
                                    <option value="masks">Masks</option>
                                    <option value="best-sellers">Best Sellers</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Quantity</label>
                                    <input
                                        name="stock_quantity"
                                        type="number"
                                        value={formData.stock_quantity}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Low Level</label>
                                    <input
                                        name="low_stock_threshold"
                                        type="number"
                                        value={formData.low_stock_threshold}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-neutral-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
