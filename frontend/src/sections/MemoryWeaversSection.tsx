import { motion } from 'framer-motion';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';

export const MemoryWeaversSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 md:px-24 py-40 overflow-hidden bg-[#07080a]">
      
      {/* Background Atmosphere: Sacred Technological Weaving */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.015, 0.03, 0.015] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(200,160,100,0.04)_0%,transparent_50%)]" 
        />
        
        {/* Intricate Weaving Pattern Overlays */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
           <div className="absolute inset-0 bg-[size:60px_60px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] rotate-45 scale-[2]" />
           <div className="absolute inset-0 bg-[size:120px_120px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] -rotate-12 scale-[1.5]" />
        </div>
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-6xl w-full flex flex-col items-start gap-32"
      >
        {/* Section Label */}
        <motion.div variants={FADE_IN_UP} className="flex items-center gap-6">
          <div className="w-12 h-px bg-zinc-800" />
          <span className="text-[10px] uppercase tracking-[1.2em] text-zinc-600 font-black">Protocolo // Memoria Viva</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-48 w-full items-center">
          <header className="flex flex-col gap-10">
            <motion.h2 
              variants={TITLE_REVEAL}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-200 uppercase leading-[0.85]"
            >
              Tejedoras de<br />la Memoria
            </motion.h2>
            <motion.div variants={FADE_IN_UP} className="w-20 h-[1px] bg-zinc-800" />
            <motion.p variants={FADE_IN_UP} className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed italic border-l border-zinc-900 pl-10">
              “Cada hilo es un bit de historia. Cada patrón, un nodo de resistencia cultural.”
            </motion.p>
          </header>

          <motion.div variants={FADE_IN_UP} className="flex flex-col gap-12">
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
              En los sótanos de las ciudades-colmena, Genoveva y las suyas codifican la historia de Bolivia en textiles inteligentes. Redes neuronales tejidas en lana de alpaca sintética, invisibles a los escáneres cuánticos de la Corporación Aymar-Tech.
            </p>
            
            {/* Technical Detail Grid */}
            <div className="grid grid-cols-2 gap-12 py-10 border-t border-zinc-900/50">
               <div className="flex flex-col gap-3">
                 <span className="text-[8px] text-zinc-600 tracking-[0.6em] uppercase font-black">Bio-Sincronización</span>
                 <span className="text-sm text-zinc-500 font-mono italic opacity-60">Frec: 432hz // Estable</span>
               </div>
               <div className="flex flex-col gap-3">
                 <span className="text-[8px] text-zinc-600 tracking-[0.6em] uppercase font-black">Compresión</span>
                 <span className="text-sm text-zinc-500 font-mono italic opacity-60">1.2 PetaHilos / cm²</span>
               </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={FADE_IN_UP}
          className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-30"
        />
      </motion.div>
    </section>
  );
};
