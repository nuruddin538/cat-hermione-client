import FeaturesSection from "@/components/home/FeaturesSection";
import GallerySection from "@/components/home/GallerySection";
import HeroSection from "@/components/home/HeroSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import RecentEventsSection from "@/components/home/RecentEventsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RecentEventsSection />
      <GallerySection />
      <NewsletterSection />
    </div>
  );
}
