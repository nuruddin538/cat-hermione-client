import FeaturesSection from "@/components/home/FeaturesSection";
import GallerySection from "@/components/home/GallerySection";
import HeroSection from "@/components/home/HeroSection";
import RecentEventsSection from "@/components/home/RecentEventsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RecentEventsSection />
      <GallerySection />
    </div>
  );
}
