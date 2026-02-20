import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    longDescription: string;
    ingredients: string;
    usage: string;
    image: string;
    rating: number;
    reviews: number;
    features: { icon: any; text: string }[];
}

export const products: Product[] = [
    {
        id: "golden-elixir-serum",
        name: "Golden Elixir Serum",
        price: 125.0,
        category: "Serums",
        description: "A potent blend of rare botanicals and skin-identical lipids for a radiant glow.",
        longDescription: "Our signature serum is a potent blend of rare botanicals and skin-identical lipids. Designed to penetrate deep into the dermis, it restores elasticity and reveals a radiant, healthy glow from within.",
        ingredients: "Squalane, Rosehip Oil, Bakuchiol, Gold Leaf, Vitamin E, Lavender Stem Cells.",
        usage: "Apply 3-5 drops onto clean, damp skin morning and night. Gently press into face and neck for optimal absorption.",
        image: "/products/serum-1.jpg",
        rating: 4.9,
        reviews: 124,
        features: [
            { icon: ShieldCheck, text: "Dermatologically Tested" },
            { icon: Truck, text: "Free Express Shipping" },
            { icon: RotateCcw, text: "30-Day Ritual Guarantee" },
        ]
    },
    {
        id: "velvet-cleansing-balm",
        name: "Velvet Cleansing Balm",
        price: 65.0,
        category: "Cleansers",
        description: "Melts away impurities and makeup while nourishing the skin barrier.",
        longDescription: "This luxurious balm transforms from a solid to a silky oil, effortlessly dissolving makeup, SPF, and pollutants. Infused with chamomile and blue tansy to soothe on contact.",
        ingredients: "Sweet Almond Oil, Shea Butter, Sunflower Seed Wax, Chamomile Extract, Blue Tansy Oil.",
        usage: "Massage a small amount onto dry skin. Add warm water to emulsify, then rinse thoroughly or remove with a warm cloth.",
        image: "/products/cleanser-1.jpg",
        rating: 4.8,
        reviews: 86,
        features: [
            { icon: ShieldCheck, text: "Dermatologically Tested" },
            { icon: Truck, text: "Free Express Shipping" },
            { icon: RotateCcw, text: "30-Day Ritual Guarantee" },
        ]
    },
    {
        id: "moonlight-renewal-cream",
        name: "Moonlight Renewal Cream",
        price: 95.0,
        category: "Moisturizers",
        description: "Overnight recovery treatment for firm, plump, and hydrated skin.",
        longDescription: "A rich, cocooning cream that works with your skin's circadian rhythm. Peptides and ceramides work overnight to repair the moisture barrier and smooth fine lines.",
        ingredients: "Ceramides NP/AP/EOP, Peptides, Hyaluronic Acid, Niacinamide, Shea Butter.",
        usage: "As the final step in your evening ritual, massage into face, neck, and décolletage using upward motions.",
        image: "/products/cream-1.jpg",
        rating: 5.0,
        reviews: 210,
        features: [
            { icon: ShieldCheck, text: "Dermatologically Tested" },
            { icon: Truck, text: "Free Express Shipping" },
            { icon: RotateCcw, text: "30-Day Ritual Guarantee" },
        ]
    },
    {
        id: "rose-quartz-mist",
        name: "Rose Quartz Mist",
        price: 45.0,
        category: "Tones & Mists",
        description: "Hydrating botanical mist to refresh and prep the skin any time of day.",
        longDescription: "Ethically sourced Bulgarian Rose Water combined with Hyaluronic Acid and Witch Hazel. A fine mist that instantly boosts hydration and balances skin pH.",
        ingredients: "Rosa Damascena Flower Water, Glycerin, Hyaluronic Acid, Aloe Vera, Witch Hazel.",
        usage: "Mist onto face after cleansing or throughout the day for a refreshing boost of hydration.",
        image: "/products/mist-1.jpg",
        rating: 4.7,
        reviews: 142,
        features: [
            { icon: ShieldCheck, text: "Dermatologically Tested" },
            { icon: Truck, text: "Free Express Shipping" },
            { icon: RotateCcw, text: "30-Day Ritual Guarantee" },
        ]
    }
];

export const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
