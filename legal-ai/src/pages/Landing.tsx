// pages/Landing.tsx
import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full px-6 py-16 flex flex-col items-center justify-start bg-gradient-animated">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Landing;
