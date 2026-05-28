import { motion } from 'framer-motion';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';

export const ResistanceSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 md:px-24 py-40 overflow-hidden bg-[#06070a]">
      
      {/* Background Atmosphere: Underground Signal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.01, 0.03, 0.01] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[size:100%_2px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(120,40,40,0.03)_0%,transparent_50%)]" />
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-6xl w-full flex flex-col items-center gap-32"
      >
        {/* Section Label */}
        <motion.div variants={FADE_IN_UP} className="flex items-center gap-6">
          <span className="text-[10px] uppercase tracking-[1em] text-red-950/40 font-black">Alerta // Insurrección Detectada</span>
        </motion.div>

        <header className="flex flex-col items-center text-center gap-10">
          <motion.h2 
            variants={TITLE_REVEAL}
            className="text-7xl md:text-9xl font-black tracking-tighter text-zinc-200 uppercase leading-[0.8]"
          >
            La Resistencia
          </motion.h2>
          <motion.div variants={FADE_IN_UP} className="w-24 h-[1px] bg-red-950/30" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-48 w-full">
          <motion.div variants={FADE_IN_UP} className="flex flex-col gap-12">
            <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] font-black border-b border-zinc-900/50 pb-6">El Símbolo // La Máscara</h3>
            <p className="text-zinc-500 text-xl font-light leading-relaxed italic border-l border-zinc-900 pl-10">
              “Nadie sabe quién es Genoveva. La máscara de plata no solo oculta un rostro; oculta a una nación entera que se niega a ser borrada del archivo universal.”
            </p>
          </motion.div>

          <motion.div variants={FADE_IN_UP} className="flex flex-col gap-12">
            <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] font-black border-b border-zinc-900/50 pb-6">El Báculo // La Bandera</h3>
            <p className="text-zinc-400 text-xl font-light leading-relaxed">
              El báculo eléctrico, forjado con restos de los procesadores de litio, es el único arma capaz de perforar los escudos cuánticos. Cuando brilla en la oscuridad del Altiplano, la esperanza se descarga en la red.
            </p>
          </motion.div>
        </div>

        {/* Refined Signal Visual */}
        <motion.div 
          variants={FADE_IN_UP}
          className="relative w-full aspect-[21/9] bg-zinc-950/20 border border-red-950/10 flex items-center justify-center relative overflow-hidden group"
        >
           <motion.div 
             animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-8 right-8 w-2 h-2 rounded-full bg-red-950/50"
           />
           
           <div className="flex flex-col items-center gap-6 opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
             <span className="font-mono text-[8px] tracking-[1em] text-zinc-600 uppercase">Señal Cifrada // Nodo: Rebelión</span>
             <div className="flex gap-2">
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                    className="w-[1px] bg-red-950/40"
                  />
                ))}
             </div>
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
