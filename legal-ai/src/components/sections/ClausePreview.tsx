// components/sections/ClausePreview.tsx
import React from "react";
import { motion } from "framer-motion";

const ClausePreview: React.FC = () => (
  <motion.div 
    className="mt-12 max-w-xl bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-md"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <p className="text-sm text-gray-500 mb-2">Clause: Termination</p>
    <p className="text-md text-gray-800">
      "Either party may terminate this agreement with 30 days written notice."
    </p>
  </motion.div>
);

export default ClausePreview;
