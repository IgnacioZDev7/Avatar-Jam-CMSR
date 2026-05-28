import { motion } from 'framer-motion';
import React from 'react';
import { GrainOverlay } from '../components/atmosphere/GrainOverlay';
import { VignetteOverlay } from '../components/atmosphere/VignetteOverlay';
import { FogLayer } from '../components/atmosphere/FogLayer';
import { AmbientGlow } from '../components/atmosphere/AmbientGlow';
import { AmbientSoundscape } from '../components/atmosphere/AmbientSoundscape';
import { LiquidCursorDistortion } from '../components/effects/LiquidCursorDistortion';
import { CinematicEnvironment } from '../components/three/CinematicEnvironment';

interface MainLayoutProps {
  children: React.ReactNode;
}

const GlobalScanline = () => (
  <motion.div 
    animate={{ top: ['-5%', '105%'] }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    className="fixed left-0 w-full h-[1px] bg-white/[0.012] z-[80] pointer-events-none"
  />
);

const ArchiveFrame = () => (
  <div className="fixed inset-4 md:inset-8 pointer-events-none z-[60] opacity-[0.08] border border-zinc-700/40">
    <div className="absolute top-0 left-0 w-4 h-px bg-zinc-300" />
    <div className="absolute top-0 left-0 h-4 w-px bg-zinc-300" />
    <div className="absolute top-0 right-0 w-4 h-px bg-zinc-300" />
    <div className="absolute top-0 right-0 h-4 w-px bg-zinc-300" />
    <div className="absolute bottom-0 left-0 w-4 h-px bg-zinc-300" />
    <div className="absolute bottom-0 left-0 h-4 w-px bg-zinc-300" />
    <div className="absolute bottom-0 right-0 w-4 h-px bg-zinc-300" />
    <div className="absolute bottom-0 right-0 h-4 w-px bg-zinc-300" />
    
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 3 }}
      className="absolute bottom-2 left-4 flex gap-6"
    >
      <span className="font-mono text-[5px] md:text-[7px] tracking-[0.5em] text-zinc-500 uppercase">Archive // Fragmented</span>
      <span className="font-mono text-[5px] md:text-[7px] tracking-[0.5em] text-zinc-500 uppercase">Signal: Stable</span>
    </motion.div>
  </div>
);

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0e] text-zinc-300 selection:bg-white/10">
      {/* 3D Cinematic Environment Layer (z-0 base) */}
      <CinematicEnvironment />

      {/* 2D Atmospheric Atmosphere Layers (Over 3D but below content) */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <AmbientGlow />
        <FogLayer intensity={0.03} speed={45} />
      </div>
      
      {/* HUD & Texture (Always top-most) */}
      <GlobalScanline />
      <ArchiveFrame />
      <VignetteOverlay />
      <GrainOverlay />
      <LiquidCursorDistortion
        trailLength={13}
        distortionStrength={1.05}
        radius={84}
        blur={9}
        fadeSpeed={0.12}
      />
      <AmbientSoundscape />
      
      {/* Content wrapper (z-20 ensures it's above background systems) */}
      <div className="relative z-20 w-full flex flex-col">
        {children}
      </div>
      
      {/* Cinematic Depth Fade (Bottom Global) */}
      <div className="fixed inset-x-0 bottom-0 h-[20vh] z-40 pointer-events-none bg-gradient-to-t from-[#0a0a0e] to-transparent opacity-80" />
    </div>
  );
};
