import { motion } from 'framer-motion';
import React from 'react';

export const AmbientGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* 1. Large Horizon Glow (The flat Andean horizon) */}
      <motion.div 
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[-20%] w-[140%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(100,140,180,0.15)_0%,transparent_70%)] blur-[120px]"
      />

      {/* 2. Cold Environmental Diffusion (Top Right) */}
      <motion.div 
        animate={{ 
          x: [20, -20, 20],
          opacity: [0.05, 0.1, 0.05] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(150,180,220,0.1)_0%,transparent_60%)] blur-[150px]"
      />

      {/* 3. Muted Industrial Amber Leak (Minimal / Distant) */}
      <motion.div 
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-5%] right-[5%] w-[40%] h-[30%] bg-[radial-gradient(circle_at_center,rgba(200,160,100,0.1)_0%,transparent_70%)] blur-[100px]"
      />

      {/* 4. Reflective "Floor" Base (Salar mirror feeling) */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-white/[0.02] to-transparent opacity-40" />
    </div>
  );
};
