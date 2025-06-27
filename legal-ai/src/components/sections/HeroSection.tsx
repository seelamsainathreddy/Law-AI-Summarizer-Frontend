import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedContract from "./AnimatedContract";

const HeroSection: React.FC = () => (
  <section className="relative min-h-screen w-full px-6 md:px-16 flex items-center justify-start">
    {/* Grid layout: left content, right animation */}
    <div className="w-full grid grid-cols-1 md:grid-cols-2 h-full items-center gap-8">
      {/* Left: Vertically centered hero text */}
      <div className="relative z-10 max-w-xl">
  <motion.p
    className="text-sm text-gray-500 italic mb-3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    “AI for Contracts — Understand before you sign.”
  </motion.p>

  <h1 className=" p-2 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-400 text-transparent bg-clip-text mb-4">
    Legal AI Summarizer
  </h1>

  <p className="text-gray-700 text-lg mb-8">
    Upload contracts and instantly get simplified clause explanations in plain English.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-start">
    <Link to="/register">
      <Button className="px-6 py-2 text-lg font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300">
        Register
      </Button>
    </Link>

    <Link to="/login">
      <Button
        variant="outline"
        className="px-6 py-2 text-lg font-medium rounded-md text-emerald-700 border-emerald-600 hover:bg-emerald-50 transition-all duration-300"
      >
        Login
      </Button>
    </Link>
  </div>
</div>

      {/* Right: Animated contract centered vertically */}
      <div className="flex items-center justify-center h-full mt-10 md:mt-0">
        <AnimatedContract />
      </div>

    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-400 animate-bounce">
      ↓ Scroll to explore more
    </div>
  </section>
);

export default HeroSection;
