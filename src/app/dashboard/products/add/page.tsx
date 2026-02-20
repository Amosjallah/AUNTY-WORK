'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { Upload, X, Save, AlertCircle } from 'lucide-react';

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
    });

    useEffect(() => {
        async function checkAdmin() {
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
            }
        }
        checkAdmin();
    }, [router]);

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
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate ID from name if ID is empty
        if (name === 'name' && !formData.id) {
            const generatedId = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({ ...prev, name: value, id: generatedId }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let image_url = '';

            // 1. Upload Image to Storage
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `products/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(filePath);

                image_url = publicUrl;
            }

            // 2. Insert Product into Database
            const { error: insertError } = await supabase
                .from('products')
                .insert([{
                    ...formData,
                    price: parseFloat(formData.price),
                    image_url,
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
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-12">
                <button onClick={() => router.back()} className="text-muted-foreground hover:text-primary mb-4 block">
                    ← Back
                </button>
                <h1 className="text-4xl font-serif">Add New Product</h1>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload Section */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm">
                    <label className="block text-sm font-medium mb-4 uppercase tracking-wider text-muted-foreground">Product Image</label>
                    <div className="relative group">
                        {imagePreview ? (
                            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-primary/20">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center aspect-square w-full max-w-sm mx-auto border-2 border-dashed border-accent hover:border-primary hover:bg-primary/5 rounded-2xl cursor-pointer transition-all">
                                <div className="flex flex-col items-center gap-4 text-muted-foreground group-hover:text-primary">
                                    <Upload className="w-12 h-12" />
                                    <span className="font-medium">Click to upload product image</span>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        )}
                    </div>
                </div>

                {/* Basic Info */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Product Name</label>
                            <input
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-accent bg-transparent focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Luxury Face Cream"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Product ID (Slug)</label>
                            <input
                                name="id"
                                required
                                value={formData.id}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-accent bg-transparent focus:ring-2 focus:ring-primary outline-none"
                                placeholder="luxury-face-cream"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-accent bg-transparent focus:ring-2 focus:ring-primary outline-none"
                                placeholder="59.99"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-accent bg-transparent focus:ring-2 focus:ring-primary outline-none"
                            >
                                <option value="cleansers">Cleansers</option>
                                <option value="serums">Serums</option>
                                <option value="moisturizers">Moisturizers</option>
                                <option value="masks">Masks</option>
                                <option value="best-sellers">Best Sellers</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Descriptions */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Short Description</label>
                        <textarea
                            name="description"
                            required
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-accent bg-transparent focus:ring-2 focus:ring-primary outline-none resize-none"
                            placeholder="A brief tagline for the product list..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Description</label>
                        <textarea
                            name="long_description"
                            rows={5}
                            value={formData.long_description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-accent bg-transparent focus:ring-2 focus:ring-primary outline-none resize-none"
                            placeholder="Detailed product benefits, history, and why it's special..."
                        />
                    </div>
                </div>

                {/* Usage & Ingredients */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Ingredients</label>
                        <textarea
                            name="ingredients"
                            rows={3}
                            value={formData.ingredients}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-accent bg-transparent focus:ring-2 focus:ring-primary outline-none resize-none"
                            placeholder="Aqua, Glycerin, Rosa Damascena Flower Water..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">How to Use</label>
                        <textarea
                            name="usage"
                            rows={3}
                            value={formData.usage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-accent bg-transparent focus:ring-2 focus:ring-primary outline-none resize-none"
                            placeholder="Apply a small amount to clean skin twice daily..."
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Adding Product...' : <><Save className="w-5 h-5" /> Save Product</>}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-4 border border-accent rounded-xl hover:bg-accent/5 transition-all font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
