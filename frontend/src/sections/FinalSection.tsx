import { motion } from 'framer-motion';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';

export const FinalSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 md:px-24 py-40 overflow-hidden bg-black">
      
      {/* Background Atmosphere: Void / Eternal Memory */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,120,0.1)_0%,transparent_60%)]" 
        />
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-24"
      >
        {/* Visual Anchor: The Seed Line */}
        <motion.div variants={FADE_IN_UP} className="w-px h-32 bg-gradient-to-b from-zinc-800 via-zinc-400 to-transparent opacity-40" />

        <header className="flex flex-col items-center gap-12">
          <motion.h2 
            variants={TITLE_REVEAL}
            className="text-5xl md:text-7xl font-light tracking-[0.5em] text-zinc-100 uppercase leading-tight cinematic-glow"
          >
            La Memoria es<br />la Semilla
          </motion.h2>
          <motion.p variants={FADE_IN_UP} className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed max-w-3xl italic">
            “Mientras un solo hilo permanezca tejido, mientras un solo archivo sea recuperado, Bolivia seguirá respirando en el Territorio Blanco.”
          </motion.p>
        </header>

        <motion.div variants={FADE_IN_UP} className="flex flex-col items-center gap-16 mt-20">
           <div className="flex flex-col items-center gap-3 opacity-20 select-none">
             <span className="text-[10px] tracking-[1em] text-zinc-500 uppercase font-black">Fin de la Transmisión</span>
             <span className="text-[7px] tracking-[0.4em] text-zinc-700 uppercase font-mono italic">Fragmento GR-2189 // Integridad: 100%</span>
           </div>

           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="group relative px-16 py-8 bg-transparent border border-zinc-900 hover:border-zinc-300 transition-all duration-1000 ease-out active:scale-95"
           >
             <span className="relative z-10 text-[10px] tracking-[1.2em] text-zinc-500 group-hover:text-zinc-100 uppercase font-black transition-colors">Reiniciar Sistema</span>
             <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           </button>
        </motion.div>

        <motion.footer variants={FADE_IN_UP} className="mt-32 opacity-10">
           <span className="text-[7px] tracking-[0.8em] text-zinc-600 uppercase font-mono">© 2189 — El Archivo de la Resistencia</span>
        </motion.footer>
      </motion.div>

      {/* Final Extreme Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50vw_rgba(0,0,0,1)] z-20" />
    </section>
  );
};
