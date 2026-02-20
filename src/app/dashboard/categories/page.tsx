'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import {
    Plus,
    Edit,
    Trash2,
    Tag,
    Search,
    X,
    Save,
    Loader2,
    ImageOff,
    Layers,
    Package,
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    created_at: string;
}

const emptyForm = { name: '', slug: '', description: '', image_url: '' };

function slugify(str: string) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [productCounts, setProductCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');

    async function fetchAll() {
        setLoading(true);
        const { data: cats } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false });

        if (cats) setCategories(cats);

        // Fetch product count per category slug
        const { data: products } = await supabase
            .from('products')
            .select('category');

        if (products) {
            const counts: Record<string, number> = {};
            products.forEach((p) => {
                if (p.category) {
                    counts[p.category] = (counts[p.category] || 0) + 1;
                }
            });
            setProductCounts(counts);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchAll();
    }, []);

    const filteredCategories = categories.filter(
        (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function openAddModal() {
        setEditingCategory(null);
        setForm(emptyForm);
        setFormError('');
        setIsModalOpen(true);
    }

    function openEditModal(cat: Category) {
        setEditingCategory(cat);
        setForm({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || '',
            image_url: cat.image_url || '',
        });
        setFormError('');
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingCategory(null);
        setForm(emptyForm);
        setFormError('');
    }

    function handleNameChange(name: string) {
        setForm((prev) => ({
            ...prev,
            name,
            slug: editingCategory ? prev.slug : slugify(name),
        }));
    }

    async function handleSave() {
        if (!form.name.trim()) return setFormError('Category name is required.');
        if (!form.slug.trim()) return setFormError('Slug is required.');
        setSaving(true);
        setFormError('');

        const payload = {
            name: form.name.trim(),
            slug: form.slug.trim(),
            description: form.description.trim() || null,
            image_url: form.image_url.trim() || null,
        };

        let error;
        if (editingCategory) {
            ({ error } = await supabase
                .from('categories')
                .update(payload)
                .eq('id', editingCategory.id));
        } else {
            ({ error } = await supabase.from('categories').insert(payload));
        }

        if (error) {
            setFormError(error.message);
        } else {
            closeModal();
            fetchAll();
        }
        setSaving(false);
    }

    async function handleDelete(cat: Category) {
        if (!confirm(`Delete category "${cat.name}"? This cannot be undone.`)) return;
        const { error } = await supabase.from('categories').delete().eq('id', cat.id);
        if (error) {
            alert('Error deleting category: ' + error.message);
        } else {
            setCategories((prev) => prev.filter((c) => c.id !== cat.id));
        }
    }

    const totalProductsMapped = Object.values(productCounts).reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Product Categories</h1>
                    <p className="text-sm text-neutral-500 mt-0.5">Organise your catalog with clear, structured categories</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all font-medium shadow-md shadow-primary/20"
                >
                    <Plus className="w-5 h-5" /> Add Category
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Categories</span>
                        <Layers className="text-primary/40" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{categories.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Products Mapped</span>
                        <Package className="text-blue-400" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{totalProductsMapped}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Uncategorised</span>
                        <Tag className="text-orange-400" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{productCounts[''] || productCounts['uncategorized'] || 0}</p>
                </div>
            </div>

            {/* Search + Grid */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-neutral-50 flex items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <span className="text-xs font-semibold text-neutral-400 ml-auto pr-2">
                        {filteredCategories.length} result{filteredCategories.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Category Cards Grid */}
                <div className="p-6">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-40 bg-neutral-100 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : filteredCategories.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="inline-flex p-4 bg-neutral-100 rounded-full mb-4">
                                <Tag size={32} className="text-neutral-300" />
                            </div>
                            <p className="text-neutral-500 font-medium">No categories found.</p>
                            <button
                                onClick={openAddModal}
                                className="mt-4 text-primary text-sm font-bold hover:underline"
                            >
                                + Add your first category
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCategories.map((cat) => (
                                <motion.div
                                    key={cat.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    className="group bg-neutral-50 hover:bg-white border border-neutral-100 hover:border-primary/20 hover:shadow-md transition-all rounded-2xl overflow-hidden"
                                >
                                    {/* Image / Banner */}
                                    <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
                                        {cat.image_url ? (
                                            <img
                                                src={cat.image_url}
                                                alt={cat.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Tag size={36} className="text-primary/20" />
                                            </div>
                                        )}
                                        {/* Actions overlay */}
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => openEditModal(cat)}
                                                className="p-2 bg-white text-neutral-700 rounded-lg hover:text-primary transition-colors shadow"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat)}
                                                className="p-2 bg-white text-neutral-700 rounded-lg hover:text-red-500 transition-colors shadow"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-bold text-neutral-900 text-sm leading-tight">{cat.name}</p>
                                                <p className="text-[11px] font-mono text-neutral-400 mt-0.5">/{cat.slug}</p>
                                            </div>
                                            <span className="shrink-0 text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                {productCounts[cat.name] || productCounts[cat.slug] || 0} products
                                            </span>
                                        </div>
                                        {cat.description && (
                                            <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">{cat.description}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            onClick={closeModal}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="pointer-events-auto w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                                    <div>
                                        <h2 className="text-lg font-bold text-neutral-900">
                                            {editingCategory ? 'Edit Category' : 'Add New Category'}
                                        </h2>
                                        <p className="text-xs text-neutral-500 mt-0.5">
                                            {editingCategory ? 'Update the details below' : 'Fill in the details to create a new category'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="px-6 py-5 space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5 block">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => handleNameChange(e.target.value)}
                                            placeholder="e.g. Face Care"
                                            className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all"
                                        />
                                    </div>

                                    {/* Slug */}
                                    <div>
                                        <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5 block">
                                            Slug <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex items-center">
                                            <span className="px-3 py-2.5 bg-neutral-100 border border-r-0 border-neutral-200 rounded-l-xl text-xs text-neutral-400 font-mono">/</span>
                                            <input
                                                type="text"
                                                value={form.slug}
                                                onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))}
                                                placeholder="face-care"
                                                className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-r-xl text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5 block">
                                            Description
                                        </label>
                                        <textarea
                                            value={form.description}
                                            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                                            placeholder="Brief description of this category..."
                                            rows={3}
                                            className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5 block">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={form.image_url}
                                            onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all"
                                        />
                                        {form.image_url && (
                                            <div className="mt-2 h-20 w-full rounded-xl overflow-hidden border border-neutral-200">
                                                <img
                                                    src={form.image_url}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Error */}
                                    {formError && (
                                        <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-xl">
                                            {formError}
                                        </p>
                                    )}
                                </div>

                                {/* Modal Footer */}
                                <div className="px-6 py-4 border-t border-neutral-100 flex justify-end gap-3">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-primary rounded-xl hover:opacity-90 transition-all disabled:opacity-60 shadow-md shadow-primary/20"
                                    >
                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                        {editingCategory ? 'Save Changes' : 'Create Category'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
