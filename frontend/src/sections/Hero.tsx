import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { TITLE_REVEAL, FADE_IN_UP, STAGGER_CONTAINER } from '../lib/motion';

// --- SUB-COMPONENTS ---

const MetadataBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 opacity-[0.25]">
    <span className="text-[6px] text-zinc-500 tracking-[0.5em] font-black uppercase">{label}</span>
    <span className="text-[9px] text-zinc-400 tracking-[0.2em] font-mono">{value}</span>
  </div>
);

const ScrollGuide = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    transition={{ delay: 5, duration: 2 }}
    className="absolute bottom-12 right-12 flex items-center gap-6 z-40"
  >
    <span className="text-[8px] tracking-[1em] text-zinc-600 uppercase font-mono">Deslizar</span>
    <div className="w-16 h-px bg-zinc-800 relative overflow-hidden">
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full bg-zinc-400/40"
      />
    </div>
  </motion.div>
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 250]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 15, damping: 45 });
  const springY = useSpring(mouseY, { stiffness: 15, damping: 45 });

  const moveX = useTransform(springX, [-0.5, 0.5], ['-2%', '2%']);
  const moveY = useTransform(springY, [-0.5, 0.5], ['-2%', '2%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[110vh] w-full flex flex-col justify-between px-8 md:px-24 py-16 md:py-24 overflow-hidden">
      
      {/* --- ATMOSPHERIC DEPTH --- */}
      <motion.div style={{ x: moveX, y: moveY }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-full h-full bg-[radial-gradient(circle_at_center,rgba(100,120,160,0.03)_0%,transparent_60%)] blur-[100px]" />
      </motion.div>

      {/* --- HEADER HUD --- */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="relative z-30 flex justify-between items-start w-full border-t border-zinc-900/30 pt-8"
      >
        <div className="flex flex-col gap-3">
           <span className="text-[9px] tracking-[1em] text-zinc-500 font-black uppercase">Archivo // Genoveva Ríos</span>
           <span className="text-[7px] tracking-[0.4em] text-zinc-600 uppercase font-mono italic">Fragmento recuperado: 27.05.2189</span>
        </div>
        <div className="hidden lg:flex gap-20">
           <MetadataBlock label="Ubicación" value="Territorio Blanco" />
           <MetadataBlock label="Sección" value="Delta_01-A" />
        </div>
      </motion.header>

      {/* --- CENTRAL COMPOSITION --- */}
      <motion.div 
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="visible"
        style={{ y: yParallax }}
        className="relative z-30 flex flex-col items-start w-full max-w-[1440px] mx-auto my-auto"
      >
        <div className="flex flex-col gap-10 md:gap-16 w-full">
          <div className="flex flex-col">
            <motion.h1 
              variants={TITLE_REVEAL}
              className="text-[clamp(4rem,12vw,11rem)] font-black text-zinc-200 leading-[0.8] tracking-[-0.05em] select-none cinematic-glow"
            >
              GENOVEVA<br />RÍOS
            </motion.h1>
            
            <motion.div variants={FADE_IN_UP} className="flex items-center gap-8 mt-12 overflow-hidden">
              <div className="w-[1px] h-16 bg-zinc-800" />
              <h2 className="text-2xl md:text-5xl font-extralight tracking-[0.5em] text-zinc-500 uppercase leading-none">
                La Tejedora de la Memoria
              </h2>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row gap-16 md:gap-40 items-start md:items-end w-full">
            <motion.div variants={FADE_IN_UP} className="max-w-lg">
              <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed tracking-wide italic border-l border-zinc-900 pl-10">
                “Bolivia dejó de existir hace mucho tiempo. Solo queda el Territorio Blanco.”
              </p>
            </motion.div>

            <motion.div variants={FADE_IN_UP} className="flex flex-col gap-12">
               <button className="group relative px-14 py-7 bg-zinc-100 text-black hover:bg-white transition-all duration-700 ease-out active:scale-95 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-5 text-[10px] tracking-[0.8em] font-black uppercase">
                    Entrar al archivo
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --- FOOTER HUD --- */}
      <motion.footer 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.8 }}
        className="relative z-30 flex justify-between items-end w-full border-b border-zinc-900/30 pb-8"
      >
        <div className="flex gap-24 font-mono text-[8px] tracking-[0.4em] text-zinc-700 uppercase">
           <div className="flex flex-col gap-2">
             <span className="opacity-40">Lat: -16.4897</span>
             <span className="opacity-40">Lng: -68.1193</span>
           </div>
           <div className="hidden sm:flex flex-col gap-2">
             <span className="opacity-40">Alt: 3,640m</span>
             <span className="opacity-40">System: Loom_OS</span>
           </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 text-right">
          <span className="text-[8px] tracking-[0.6em] text-zinc-600 font-bold uppercase italic opacity-60">Acceso Nivel 0</span>
          <div className="flex gap-1.5">
             {[...Array(5)].map((_, i) => (
               <motion.div 
                 key={i}
                 animate={{ opacity: [0.05, 0.3, 0.05] }}
                 transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                 className="w-5 h-[1px] bg-zinc-800" 
               />
             ))}
          </div>
        </div>
      </motion.footer>

      <ScrollGuide />
    </section>
  );
};
