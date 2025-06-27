"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const papers = [0, 1, 2, 3, 4];

const initialPositions = [
  { x: -140, y: 120, rotate: -15 },
  { x: -70, y: 130, rotate: -7 },
  { x: 0, y: 125, rotate: 0 },
  { x: 70, y: 130, rotate: 7 },
  { x: 140, y: 120, rotate: 15 },
];

const AnimatedContract: React.FC = () => {
  const [merged, setMerged] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMerged(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const smoothScrollToBottom = (element: HTMLElement, duration: number) => {
    const start = element.scrollTop;
    const end = element.scrollHeight - element.clientHeight;
    const distance = end - start;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollTop = start + distance * progress;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (merged && scrollRef.current) {
      smoothScrollToBottom(scrollRef.current, 4000);
    }
  }, [merged]);

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center overflow-visible px-4 sm:px-6">
      {/* Papers */}
      {papers.map((i) => (
        <motion.div
          key={i}
          initial={{
            x: initialPositions[i].x,
            y: initialPositions[i].y,
            rotate: initialPositions[i].rotate,
            scale: 1,
          }}
          animate={{
            x: merged ? 0 : initialPositions[i].x,
            y: merged ? -i * 5 : initialPositions[i].y,
            rotate: merged ? 0 : initialPositions[i].rotate,
            scale: merged ? 0.9 : 1,
          }}
          transition={{
            delay: merged ? i * 0.15 : 0,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute w-[260px] sm:w-[280px] h-[180px] sm:h-[200px] bg-white border border-gray-300 rounded-lg shadow-lg p-4"
          style={{ zIndex: papers.length - i }}
        />
      ))}

      {/* Final clause panel */}
      {merged && (
        <motion.div

          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          ref={scrollRef}
          className="absolute max-w-[90vw] w-[220px] sm:w-[240px] max-h-[130px] sm:max-h-[150px] overflow-y-auto bg-white rounded-md border border-yellow-400 p-3 shadow-lg text-gray-900 z-50 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100 font-sans"
          style={{
            top: "calc(50% - 90px)",
            left: "58%", // slightly right aligned to stack
            transform: "translateX(-30%)",
          }}
         >
          {[
            {
              title: "Clause: Termination",
              text: "Either party may terminate this agreement with 30 days written notice.",
            },
            {
              title: "Clause: Confidentiality",
              text: "Both parties agree to keep the information confidential for 5 years.",
            },
            {
              title: "Clause: Payment Terms",
              text: "Payments shall be made within 30 days of invoice receipt.",
            },
            {
              title: "Clause: Liability",
              text: "Neither party shall be liable for indirect damages.",
            },
          ].map((clause, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <h3 className="text-[9px] font-semibold text-yellow-600 tracking-widest uppercase mb-1 border-b border-yellow-300 pb-1">
                {clause.title}
              </h3>
              <p className="text-xs leading-snug text-gray-700">{clause.text}</p>
            </div>
          ))}

          <div className="mt-3 inline-block bg-yellow-100 text-yellow-800 text-[9px] px-2 py-0.5 rounded shadow-sm border border-yellow-300 select-none">
            ⚠️ AI Flag: Termination Window Too Short
          </div>
        </motion.div>
      )}

      {/* Elliptical floor shadow */}
      <div
        className="absolute bottom-14 rounded-full"
        style={{
          width: "60%",
          maxWidth: "360px",
          height: "60px",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 80%)",
          filter: "blur(12px)",
          transform: "translateY(10px)",
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default AnimatedContract;
