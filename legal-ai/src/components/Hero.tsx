import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedContract from "./sections/AnimatedContract";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen px-6 py-16 bg-gradient-to-br from-[#f6f6f6] via-white to-[#eef3ef] flex items-center justify-center">
      {/* Blurred Background Accent */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-[60vw] h-[60vw] bg-green-100 rounded-full top-[-20%] left-[-10%] blur-3xl opacity-30 animate-pulse" />
        <div className="absolute w-[80vw] h-[80vw] bg-emerald-200 rounded-full bottom-[-30%] right-[-20%] blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        {/* Left: Paper Card Content */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-sm text-gray-500 italic mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            “AI for Contracts — Understand before you sign.”
          </motion.p>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-400 text-transparent bg-clip-text mb-4">
            Legal AI Summarizer
          </h1>

          <p className="text-gray-700 text-lg mb-8">
            Upload contracts and instantly get simplified clause explanations in plain English.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-6 py-2 text-lg hover:scale-105 transition-transform duration-300">
              Try Demo
            </Button>
            <Link to="/login">
              <Button variant="outline" className="px-6 py-2 text-lg hover:scale-105 transition-transform duration-300">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right: Animated Contract Stack */}
        <div className="flex justify-center">
          <AnimatedContract />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
