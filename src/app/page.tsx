import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Marquee from "@/components/home/Marquee";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <BrandPhilosophy />
    </div>
  );
}

