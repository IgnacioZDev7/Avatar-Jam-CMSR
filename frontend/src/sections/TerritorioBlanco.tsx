import { motion } from 'framer-motion';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';

export const TerritorioBlanco = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 md:px-24 py-40 overflow-hidden border-t border-zinc-900/20">
      
      {/* Background Elements (Complementary) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.01, 0.03, 0.01] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-zinc-700 via-transparent to-transparent" 
        />
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center gap-32"
      >
        {/* Section Header */}
        <header className="flex flex-col items-center gap-8">
          <motion.div variants={FADE_IN_UP} className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[1em] text-zinc-600 font-black">Coordenadas // Salar de Uyuni</span>
          </motion.div>
          
          <motion.h2 
            variants={TITLE_REVEAL}
            className="text-6xl md:text-9xl font-bold tracking-tighter text-zinc-200 uppercase leading-[0.8]"
          >
            El Territorio<br />Blanco
          </motion.h2>
          
          <motion.div variants={FADE_IN_UP} className="w-16 h-[1px] bg-zinc-800" />
        </header>

        {/* Narrative Lore */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-40 text-left">
          <motion.div variants={FADE_IN_UP} className="flex flex-col gap-10">
            <h3 className="text-zinc-500 text-[9px] uppercase tracking-[0.6em] font-black border-l border-zinc-800 pl-6">La Extracción</h3>
            <p className="text-zinc-500 text-xl leading-relaxed font-light italic">
              “Lo que alguna vez fue el espejo del cielo, ahora es una herida industrial. El Salar de Uyuni ya no refleja las estrellas; solo el parpadeo de las torres de la Corporación Aymar-Tech.”
            </p>
          </motion.div>

          <motion.div variants={FADE_IN_UP} className="flex flex-col gap-10">
            <h3 className="text-zinc-500 text-[9px] uppercase tracking-[0.6em] font-black border-l border-zinc-800 pl-6">La Autocracia</h3>
            <p className="text-zinc-400 text-xl leading-relaxed font-light">
              El aire es pesado, cargado de sedimentos alcalinos y el zumbido constante de los procesadores cuánticos. En el Territorio Blanco, la memoria no se recuerda, se procesa.
            </p>
          </motion.div>
        </div>

        {/* Refined Industrial Visual */}
        <motion.div 
          variants={FADE_IN_UP}
          className="relative w-full aspect-[21/9] bg-zinc-950/40 border border-zinc-900/50 flex items-center justify-center group overflow-hidden"
        >
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent pointer-events-none"
          />
          
          <div className="flex flex-col items-center gap-6 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
            <span className="font-mono text-[8px] tracking-[0.8em] text-zinc-500 uppercase italic">Escaneo de Sector // 07-G</span>
          </div>

          <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-zinc-800" />
          <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-zinc-800" />
          
          {/* Subtle moving "data" dots */}
          {[...Array(3)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ opacity: [0, 0.2, 0] }}
               transition={{ duration: 4, delay: i * 1.5, repeat: Infinity }}
               className="absolute w-1 h-1 bg-zinc-400 rounded-full"
               style={{ 
                 top: `${20 + i * 25}%`, 
                 left: `${30 + i * 20}%` 
               }}
             />
          ))}
        </motion.div>

        {/* Closing Metadata */}
        <motion.footer variants={FADE_IN_UP} className="flex flex-col items-center gap-6 opacity-30">
           <div className="flex gap-12 font-mono text-[7px] tracking-[0.6em] text-zinc-600 uppercase">
             <span>Aymar-Tech // Proprietary</span>
             <span>Status: Operational</span>
           </div>
        </motion.footer>
      </motion.div>

      {/* Side Metadata (Vertical) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-40 opacity-10 select-none">
        <span className="rotate-90 origin-left font-mono text-[9px] tracking-[1.2em] text-zinc-500 uppercase whitespace-nowrap">Extracción Continua</span>
        <span className="rotate-90 origin-left font-mono text-[9px] tracking-[1.2em] text-zinc-500 uppercase whitespace-nowrap">Cod: 00.14.99.X</span>
      </div>
    </section>
  );
};
