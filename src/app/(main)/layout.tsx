import type { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
