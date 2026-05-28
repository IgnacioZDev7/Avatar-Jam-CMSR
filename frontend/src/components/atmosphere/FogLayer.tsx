import { motion } from 'framer-motion';
import React from 'react';

interface FogLayerProps {
  intensity?: number;
  color?: string;
  speed?: number;
}

export const FogLayer: React.FC<FogLayerProps> = ({ 
  intensity = 0.08, 
  color = 'rgba(180, 210, 230, 0.4)', // More visible, blue-tinted fog
  speed = 35 
}) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary Drifting Fog */}
      <motion.div 
        animate={{ 
          x: ['-10%', '10%', '-10%'],
          y: ['-5%', '5%', '-5%'],
          opacity: [intensity, intensity * 1.5, intensity]
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] blur-[100px] rounded-full"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)` }}
      />
      
      {/* Secondary Depth Layer */}
      <motion.div 
        animate={{ 
          x: ['15%', '-15%', '15%'],
          y: ['5%', '-5%', '15%'],
          opacity: [intensity * 0.7, intensity * 1.2, intensity * 0.7]
        }}
        transition={{ 
          duration: speed * 1.4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 7
        }}
        className="absolute bottom-[-15%] right-[-15%] w-[130%] h-[130%] blur-[140px] rounded-full"
        style={{ background: `radial-gradient(circle at center, rgba(140, 160, 180, 0.3) 0%, transparent 55%)` }}
      />
    </div>
  );
};
