import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import ShopSection from "../components/home/ShopSection";
import DemandSection from "../components/home/DemandSection";
import StoriesSection from "../components/home/StoriesSection";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ShopSection />
      <DemandSection />
      <StoriesSection />
      <Footer />
    </div>
  );
}