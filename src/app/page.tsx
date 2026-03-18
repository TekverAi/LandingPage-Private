/* LANDING PAGE COMPONENT */
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HeroStats from "@/components/landing/HeroStats";
import ProductOverview from "@/components/landing/ProductOverview";
import PlatformCapabilities from "@/components/landing/PlatformCapabilities";
import WorkflowSection from "@/components/landing/WorkflowSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import LiveCodeReview from "@/components/landing/LiveCodeReview";
import ArchitectureDiagram from "@/components/landing/ArchitectureDiagram";
import DeveloperAPI from "@/components/landing/DeveloperAPI";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import GetInTouch from "@/components/landing/GetInTouch";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main style={{ background: "var(--color-bg-primary)" }}>
      <Navbar />
      <Hero />
      <HeroStats />
      {/* md+ screens get breathing room between sections */}
      <div className="flex flex-col">
        <ProductOverview />
        <PlatformCapabilities />
        <WorkflowSection />
        
        <DashboardPreview />
        <LiveCodeReview />
        <ArchitectureDiagram />
        <DeveloperAPI />
        
        <Pricing />
        <FAQ />
        <GetInTouch />
      </div>
      <Footer />
    </main>
  );
}
